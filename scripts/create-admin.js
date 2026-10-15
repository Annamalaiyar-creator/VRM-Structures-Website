import "dotenv/config";
import sql from "mssql";
import bcrypt from "bcryptjs";

const { SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD, SQL_PORT, SQL_ENCRYPT, SQL_TRUST_SERVER_CERTIFICATE } = process.env;
const { ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD } = process.env;

if (![SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD, ADMIN_EMAIL, ADMIN_PASSWORD].every(Boolean)) {
  throw new Error("Set SQL connection variables and ADMIN_EMAIL/ADMIN_PASSWORD before creating the admin account.");
}
if (ADMIN_PASSWORD.length < 12) throw new Error("ADMIN_PASSWORD must contain at least 12 characters.");

const serverHost = SQL_SERVER.split(":")[0].trim();
const portCandidate = SQL_SERVER.split(":")[1];
const serverPort = Number(SQL_PORT || (portCandidate && portCandidate !== "0" ? portCandidate : 1433));

const pool = await sql.connect({
  server: serverHost,
  database: SQL_DATABASE,
  user: SQL_USER,
  password: SQL_PASSWORD,
  port: serverPort,
  options: {
    encrypt: SQL_ENCRYPT !== "false",
    trustServerCertificate: SQL_TRUST_SERVER_CERTIFICATE === "true",
  },
});

const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
await pool.request()
  .input("email", sql.NVarChar(254), ADMIN_EMAIL.trim().toLowerCase())
  .input("displayName", sql.NVarChar(150), ADMIN_NAME || "Administrator")
  .input("passwordHash", sql.NVarChar(100), passwordHash)
  .query(`MERGE dbo.AdminUsers AS target
    USING (SELECT @email AS Email) AS source ON target.Email = source.Email
    WHEN MATCHED THEN UPDATE SET DisplayName = @displayName, PasswordHash = @passwordHash
    WHEN NOT MATCHED THEN INSERT (Email, DisplayName, PasswordHash) VALUES (@email, @displayName, @passwordHash);`);

await pool.close();
console.log(`Admin account provisioned for ${ADMIN_EMAIL.trim().toLowerCase()}.`);