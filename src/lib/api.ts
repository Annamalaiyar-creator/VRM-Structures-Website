type RequestOptions = {
  method?: string;
  body?: unknown;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`/api${path}`, {
    method: options.method || "GET",
    credentials: "same-origin",
    headers: options.body === undefined ? undefined : { "Content-Type": "application/json" },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  if (!response.ok) {
    const result = await response.json().catch(() => null);
    throw new Error(result?.error || "The request could not be completed.");
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const databaseApi = {
  login: (email: string, password: string) =>
    request<{ id: number; email: string; displayName: string }>("/auth/login", {
      method: "POST",
      body: { email, password },
    }),
  session: () =>
    request<{ id: number; email: string; displayName: string }>("/auth/session"),
  logout: () => request<void>("/auth/logout", { method: "POST" }),
  adminData: () =>
    request<{
      jobs: any[];
      articles: any[];
      settings: Record<string, string>;
      notifications: any[];
    }>("/admin/data"),
  saveRecord: (recordType: "job" | "article", record: { id: string }) =>
    request<void>(`/admin/${recordType}/${encodeURIComponent(record.id)}`, {
      method: "PUT",
      body: record,
    }),
  deleteRecord: (recordType: "job" | "article", recordId: string) =>
    request<void>(`/admin/${recordType}/${encodeURIComponent(recordId)}`, { method: "DELETE" }),
  saveSettings: (settings: Record<string, string>, password?: string) =>
    request<void>("/admin/settings", { method: "PUT", body: { settings, password } }),
  addNotification: (notification: unknown) =>
    request<void>("/admin/notifications", { method: "POST", body: notification }),
  markNotificationRead: (notificationId: string) =>
    request<void>(`/admin/notifications/${encodeURIComponent(notificationId)}`, { method: "PUT" }),
  markNotificationsRead: () => request<void>("/admin/notifications", { method: "PUT" }),
  jobs: () => request<any[]>("/jobs"),
  articles: () => request<any[]>("/articles"),
  submit: (kind: "quote" | "inquiry" | "application", data: unknown) =>
    request<{ submitted: boolean }>(`/submissions/${kind}`, { method: "POST", body: data }),
};