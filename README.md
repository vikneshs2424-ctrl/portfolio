# Viknesh S - Smart Temple Control Room Portfolio

The standalone Smart Temple Control Room portfolio is the main site. It uses its own animated theme and effects and connects to an Express API backed by MongoDB.

## Requirements
- Node.js LTS and npm
- MongoDB Community Server running locally, or a MongoDB Atlas connection string

## 1. Configure the backend

```bash
cd server
copy .env.example .env
npm install
```

Edit `server/.env`: set a long random `JWT_SECRET`, your admin email and password, and the correct `MONGO_URI`. Keep `.env` private; it is excluded from Git.

## 2. Start the standalone API

In the `server` folder, run:

```bash
npm run dev:standalone
```

The API runs on port 5001. Check its database connection at `http://localhost:5001/api/health`.

## 3. Start the main site

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL printed by Vite with `/futuristic-portfolio.html` appended, for example `http://localhost:5173/futuristic-portfolio.html`. The root URL serves the same standalone portfolio and visual style.

## 4. Portfolio data and portrait

The page loads profile and project data from MongoDB. Contact form messages are stored in the `contacts` collection. Replace `client/public/viknesh-anime-character.png` with your portrait, keeping the same filename, or update its image path in `client/public/futuristic-portfolio.html`.

## Notes
- The first API start creates the admin account from `.env` if it does not already exist and seeds starter profile and project data when those collections are empty.
- Never commit `.env` or publish secrets.
- This setup is intended for local development. Use HTTPS, strong secrets, a production database, and proper hosting before public deployment.
- If PowerShell blocks `npm.ps1`, use `npm.cmd install` and `npm.cmd run dev`, or use Command Prompt.
