import "dotenv/config";
import express from "express";
import sql from "mssql";
import bcrypt from "bcryptjs";
import { createHmac, timingSafeEqual } from "node:crypto";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT || 3001);
const sessionSecret = process.env.ADMIN_SESSION_SECRET || "";
const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const productionFiles = path.join(projectRoot, "dist");

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

let poolPromise;

function getPool() {
  if (!poolPromise) {
    const required = ["SQL_SERVER", "SQL_DATABASE", "SQL_USER", "SQL_PASSWORD"];
    const missing = required.filter((name) => !process.env[name]);
    if (missing.length) throw new Error(`Missing server configuration: ${missing.join(", ")}`);

    const serverHost = process.env.SQL_SERVER.split(":")[0].trim();
    const portCandidate = process.env.SQL_SERVER.split(":")[1];
    const serverPort = Number(process.env.SQL_PORT || (portCandidate && portCandidate !== "0" ? portCandidate : 1433));

    poolPromise = sql.connect({
      server: serverHost,
      database: process.env.SQL_DATABASE,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      port: serverPort,
      connectionTimeout: 15000,
      requestTimeout: 15000,
      options: {
        encrypt: process.env.SQL_ENCRYPT !== "false",
        trustServerCertificate: process.env.SQL_TRUST_SERVER_CERTIFICATE === "true",
      },
      pool: { min: 0, max: 10, idleTimeoutMillis: 30000 },
    }).catch((error) => {
      poolPromise = undefined;
      throw error;
    });
  }
  return poolPromise;
}

function signToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", sessionSecret).update(body).digest("base64url");
  return `${body}.${signature}`;
}

function verifyToken(token) {
  if (!sessionSecret || !token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = createHmac("sha256", sessionSecret).update(body).digest();
  const actual = Buffer.from(signature, "base64url");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    return payload.exp > Date.now() ? payload : null;
  } catch {
    return null;
  }
}

function getCookie(request, name) {
  const cookie = request.headers.cookie?.split(";").map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : "";
}

function requireAdmin(request, response, next) {
  const session = verifyToken(getCookie(request, "vrm_admin"));
  if (!session) return response.status(401).json({ error: "Admin sign-in required." });
  request.admin = session;
  next();
}

function handleError(response, error) {
  console.error("API request failed:", error);
  response.status(500).json({ error: "The request could not be completed." });
}

function safeJson(value, fallback) {
  try { return JSON.parse(value); } catch { return fallback; }
}

async function getRecords(recordType) {
  const pool = await getPool();
  const result = await pool.request()
    .input("recordType", sql.NVarChar(30), recordType)
    .query("SELECT RecordId, DataJson FROM dbo.ContentRecords WHERE RecordType = @recordType ORDER BY UpdatedAt DESC");
  return result.recordset.map((record) => ({ ...safeJson(record.DataJson, {}), id: record.RecordId }));
}

async function writeRecord(recordType, recordId, data) {
  const pool = await getPool();
  await pool.request()
    .input("recordType", sql.NVarChar(30), recordType)
    .input("recordId", sql.NVarChar(150), recordId)
    .input("dataJson", sql.NVarChar(sql.MAX), JSON.stringify(data))
    .query(`MERGE dbo.ContentRecords AS target
      USING (SELECT @recordType AS RecordType, @recordId AS RecordId) AS source
      ON target.RecordType = source.RecordType AND target.RecordId = source.RecordId
      WHEN MATCHED THEN UPDATE SET DataJson = @dataJson, UpdatedAt = SYSUTCDATETIME()
      WHEN NOT MATCHED THEN INSERT (RecordType, RecordId, DataJson) VALUES (@recordType, @recordId, @dataJson);`);
}

async function saveNotification(data) {
  const pool = await getPool();
  await pool.request()
    .input("notificationId", sql.NVarChar(100), data.id)
    .input("dataJson", sql.NVarChar(sql.MAX), JSON.stringify(data))
    .query(`MERGE dbo.Notifications AS target
      USING (SELECT @notificationId AS NotificationId) AS source
      ON target.NotificationId = source.NotificationId
      WHEN MATCHED THEN UPDATE SET DataJson = @dataJson
      WHEN NOT MATCHED THEN INSERT (NotificationId, DataJson) VALUES (@notificationId, @dataJson);`);
}

async function getSettings() {
  const pool = await getPool();
  const result = await pool.request().query("SELECT DataJson FROM dbo.AppSettings WHERE SettingsId = 1");
  return result.recordset[0] ? safeJson(result.recordset[0].DataJson, {}) : {};
}

app.get("/api/health", async (_request, response) => {
  try {
    const pool = await getPool();
    await pool.request().query("SELECT 1 AS connected");
    response.json({ status: "ok", database: "connected" });
  } catch (error) { handleError(response, error); }
});

app.post("/api/auth/login", async (request, response) => {
  try {
    if (sessionSecret.length < 32) return response.status(503).json({ error: "Admin sessions are not configured." });
    const email = String(request.body?.email || "").trim().toLowerCase();
    const password = String(request.body?.password || "");
    if (!email || !password || password.length > 200) {
      return response.status(400).json({ error: "Enter your admin email and password." });
    }
    const pool = await getPool();
    const result = await pool.request()
      .input("email", sql.NVarChar(254), email)
      .query("SELECT AdminId, Email, DisplayName, PasswordHash FROM dbo.AdminUsers WHERE Email = @email");
    const admin = result.recordset[0];
    if (!admin || !(await bcrypt.compare(password, admin.PasswordHash))) {
      return response.status(401).json({ error: "Invalid admin email or password." });
    }
    const token = signToken({ id: admin.AdminId, email: admin.Email, exp: Date.now() + 8 * 60 * 60 * 1000 });
    response.setHeader("Set-Cookie", `vrm_admin=${encodeURIComponent(token)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${process.env.NODE_ENV === "production" ? "; Secure" : ""}`);
    response.json({ id: admin.AdminId, email: admin.Email, displayName: admin.DisplayName });
  } catch (error) { handleError(response, error); }
});

app.get("/api/auth/session", requireAdmin, async (request, response) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input("adminId", sql.Int, request.admin.id)
      .query("SELECT AdminId, Email, DisplayName FROM dbo.AdminUsers WHERE AdminId = @adminId");
    const admin = result.recordset[0];
    if (!admin) return response.status(401).json({ error: "Admin account not found." });
    response.json({ id: admin.AdminId, email: admin.Email, displayName: admin.DisplayName });
  } catch (error) { handleError(response, error); }
});

app.post("/api/auth/logout", (_request, response) => {
  response.setHeader("Set-Cookie", `vrm_admin=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${process.env.NODE_ENV === "production" ? "; Secure" : ""}`);
  response.status(204).end();
});

app.get("/api/jobs", async (_request, response) => {
  try { response.json(await getRecords("job")); } catch (error) { handleError(response, error); }
});

app.get("/api/articles", async (_request, response) => {
  try { response.json(await getRecords("article")); } catch (error) { handleError(response, error); }
});

app.get("/api/admin/data", requireAdmin, async (_request, response) => {
  try {
    const pool = await getPool();
    const notificationsResult = await pool.request().query("SELECT DataJson FROM dbo.Notifications ORDER BY CreatedAt DESC");
    response.json({
      jobs: await getRecords("job"),
      articles: await getRecords("article"),
      settings: await getSettings(),
      notifications: notificationsResult.recordset.map((row) => safeJson(row.DataJson, {})),
    });
  } catch (error) { handleError(response, error); }
});

app.put("/api/admin/:recordType/:recordId", requireAdmin, async (request, response) => {
  const { recordType, recordId } = request.params;
  if (!["job", "article"].includes(recordType) || !recordId || recordId.length > 150) {
    return response.status(400).json({ error: "Invalid content record." });
  }
  try {
    await writeRecord(recordType, recordId, request.body || {});
    response.status(204).end();
  } catch (error) { handleError(response, error); }
});

app.delete("/api/admin/:recordType/:recordId", requireAdmin, async (request, response) => {
  const { recordType, recordId } = request.params;
  if (!["job", "article"].includes(recordType)) return response.status(400).json({ error: "Invalid content record." });
  try {
    const pool = await getPool();
    await pool.request()
      .input("recordType", sql.NVarChar(30), recordType)
      .input("recordId", sql.NVarChar(150), recordId)
      .query("DELETE FROM dbo.ContentRecords WHERE RecordType = @recordType AND RecordId = @recordId");
    response.status(204).end();
  } catch (error) { handleError(response, error); }
});

app.put("/api/admin/settings", requireAdmin, async (request, response) => {
  try {
    const settings = request.body?.settings;
    if (!settings || typeof settings !== "object") return response.status(400).json({ error: "Invalid settings." });
    if (request.body.password && String(request.body.password).length < 12) {
      return response.status(400).json({ error: "New passwords must be at least 12 characters." });
    }
    const pool = await getPool();
    await pool.request()
      .input("dataJson", sql.NVarChar(sql.MAX), JSON.stringify(settings))
      .query(`MERGE dbo.AppSettings AS target
        USING (SELECT 1 AS SettingsId) AS source ON target.SettingsId = source.SettingsId
        WHEN MATCHED THEN UPDATE SET DataJson = @dataJson, UpdatedAt = SYSUTCDATETIME()
        WHEN NOT MATCHED THEN INSERT (SettingsId, DataJson) VALUES (1, @dataJson);`);
    if (request.body.password) {
      const newHash = await bcrypt.hash(String(request.body.password), 12);
      await pool.request()
        .input("adminId", sql.Int, request.admin.id)
        .input("passwordHash", sql.NVarChar(100), newHash)
        .input("displayName", sql.NVarChar(150), String(settings.adminName || "Administrator"))
        .query("UPDATE dbo.AdminUsers SET PasswordHash = @passwordHash, DisplayName = @displayName WHERE AdminId = @adminId");
    } else {
      await pool.request()
        .input("adminId", sql.Int, request.admin.id)
        .input("displayName", sql.NVarChar(150), String(settings.adminName || "Administrator"))
        .query("UPDATE dbo.AdminUsers SET DisplayName = @displayName WHERE AdminId = @adminId");
    }
    response.status(204).end();
  } catch (error) { handleError(response, error); }
});

app.post("/api/admin/notifications", requireAdmin, async (request, response) => {
  try {
    const notification = request.body;
    if (!notification?.id || !notification?.text) return response.status(400).json({ error: "Invalid notification." });
    await saveNotification(notification);
    response.status(201).end();
  } catch (error) { handleError(response, error); }
});

app.put("/api/admin/notifications", requireAdmin, async (_request, response) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT DataJson FROM dbo.Notifications");
    for (const row of result.recordset) {
      const notification = safeJson(row.DataJson, {});
      notification.read = true;
      await saveNotification(notification);
    }
    response.status(204).end();
  } catch (error) { handleError(response, error); }
});

app.put("/api/admin/notifications/:notificationId", requireAdmin, async (request, response) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input("notificationId", sql.NVarChar(100), request.params.notificationId)
      .query("SELECT DataJson FROM dbo.Notifications WHERE NotificationId = @notificationId");
    if (!result.recordset[0]) return response.status(404).json({ error: "Notification not found." });
    const notification = safeJson(result.recordset[0].DataJson, {});
    notification.read = true;
    await saveNotification(notification);
    response.status(204).end();
  } catch (error) { handleError(response, error); }
});

app.post("/api/submissions/:kind", async (request, response) => {
  const tableByKind = { quote: "Quotes", inquiry: "Inquiries", application: "JobApplications" };
  const table = tableByKind[request.params.kind];
  if (!table) return response.status(404).json({ error: "Unknown submission type." });
  const submission = request.body;
  if (!submission || typeof submission !== "object" || JSON.stringify(submission).length > 100000) {
    return response.status(400).json({ error: "Invalid submission." });
  }
  try {
    const pool = await getPool();
    await pool.request()
      .input("submissionJson", sql.NVarChar(sql.MAX), JSON.stringify(submission))
      .query(`INSERT INTO dbo.${table} (DataJson) VALUES (@submissionJson)`);
    response.status(201).json({ submitted: true });
  } catch (error) { handleError(response, error); }
});

if (existsSync(productionFiles)) {
  app.use(express.static(productionFiles));
  app.get("*", (_request, response) => response.sendFile(path.join(productionFiles, "index.html")));
}

app.listen(port, () => console.log(`VRM API listening on port ${port}`));