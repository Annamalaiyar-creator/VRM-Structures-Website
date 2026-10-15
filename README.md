<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/69431a6c-62df-4029-8660-6d91ffa375de

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## SQL Server Admin Backend

The admin portal and editable careers/articles content use Microsoft SQL Server through the Express API. SQL credentials must be configured as server-side environment variables in the Node.js hosting panel; never add database credentials to frontend code or commit a real `.env` file.

1. Create the SQL Server database and a dedicated database user in the hosting panel. Grant that user permission to create/read/update/delete tables in this database. Use the panel's displayed server, database, user, and password in the Node application environment.
2. Run `database/schema.sql` once against the new database using the hosting SQL tool or SQL Server Management Studio.
3. Copy the SQL variables from `.env.example` into the Node app's server environment. Set `SQL_SERVER`, `SQL_DATABASE`, `SQL_USER`, and `SQL_PASSWORD`; set `ADMIN_SESSION_SECRET` to a random value of at least 32 characters. Set `NODE_ENV=production` on the host.
4. Create the first admin by temporarily providing `ADMIN_EMAIL`, `ADMIN_NAME`, and a strong `ADMIN_PASSWORD` to the server environment, then run `npm run admin:create`. Remove `ADMIN_PASSWORD` from the environment after the command succeeds. This provisions a bcrypt-hashed password in `dbo.AdminUsers`; the old hard-coded demo login is not carried over.
5. Build the site with `npm run build` and configure the hosting Node.js application to run `npm start`. The API and built React site are served from the same origin. The first admin login migrates existing jobs/articles/notifications from that browser's old local storage into SQL Server.

For local development, run `npm run api` in one terminal with a local `.env`, and `npm run dev` in another. Vite proxies `/api` requests to port 3001. Verify the database connection at `/api/health` after the Node server is running.

The database stores admin accounts, editable jobs and articles, settings, notifications, quotes, inquiries, and job applications. Public visitors can read published jobs/articles and submit forms; admin mutations require a signed, HTTP-only session cookie.
