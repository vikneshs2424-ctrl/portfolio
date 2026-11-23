# Viknesh S — Full-Stack Portfolio

A React + Vite portfolio with an Express API, MongoDB database, and a protected admin dashboard.

## Requirements
- Node.js (LTS) and npm
- MongoDB Community Server running locally, or a MongoDB Atlas connection string
- VS Code

## 1. Open the project
Extract the ZIP, then open the `viknesh-portfolio` folder in VS Code.

## 2. Start MongoDB
If you installed MongoDB locally, start the MongoDB service from Windows Services (if it is not already running).
Default local connection:
`mongodb://127.0.0.1:27017/viknesh_portfolio`

## 3. Configure the backend
Open a terminal in VS Code:

```bash
cd server
copy .env.example .env
npm install
```

Open `server/.env`. Change `JWT_SECRET` to a long random secret. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` to your own private admin credentials. Do not share this file or upload it to GitHub.

Start the API:

```bash
npm run dev
```

The API runs at http://localhost:5000.
Check it at http://localhost:5000/api/health.

## 4. Start the frontend
Open a **second** VS Code terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL printed by Vite, usually http://localhost:5173.

## 5. Admin dashboard
Open `http://localhost:5173/admin` and sign in using the email/password you set in `server/.env`.
From the dashboard you can add, edit, and delete projects and update profile information.

## 6. Add your profile photo
Copy your photo into `client/public/` and name it `profile.jpg`.
The portfolio automatically uses `/profile.jpg`. If you use another filename, update `client/src/App.jsx`.

## 7. Important notes
- The first backend start creates the admin account from `.env` if it does not already exist.
- Project and profile edits are stored in MongoDB.
- The website is currently intended for local development. Before public deployment, use strong secrets, HTTPS, a production database, and proper hosting.
- Never commit `.env` to GitHub.
- This ZIP includes starter portfolio data based on the resume details supplied. Review and update any wording before publishing.

## 8. Standalone Smart Temple Control Room portfolio
The no-framework portfolio is the main site at `http://localhost:5173/`. It is also available at `http://localhost:5173/futuristic-portfolio.html`.

In a separate terminal, start its API with:

```bash
cd server
npm run dev:standalone
```

This API runs on port 5001 and uses the same `MONGO_URI` and database as the original API on port 5000. Its health endpoint is `http://localhost:5001/api/health`. The standalone page loads profile and project data from MongoDB, and contact form messages are stored in the `contacts` collection.

## Troubleshooting (Windows PowerShell)
If PowerShell blocks `npm.ps1`, use `npm.cmd install` and `npm.cmd run dev`, or open Command Prompt in VS Code.
If the frontend says it cannot reach the API, make sure the backend terminal is still running on port 5000.
If MongoDB connection fails, verify the MongoDB service is running and that `MONGO_URI` in `server/.env` is correct.
