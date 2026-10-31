# Prepwise frontend

The React/Vite frontend uses Tailwind CSS v4 and includes a landing page, locally stored demo sign-in,
dashboard, interview practice flow, session history, profile, settings, and a
resume-analyzer availability screen.

## Run locally

From this directory:

```powershell
npm install
npm run dev
```

The interview screens use the Flask API at `http://localhost:5000/api` by
default. Set `VITE_API_URL` in a frontend `.env` file to override the API base
URL. Start and initialize the backend using the instructions in
[`../backend/README.md`](../backend/README.md).

Sign-in and profile details are browser-local demo functionality, not backend
authentication. The backend currently provides interview-session endpoints
only; resume analysis, AI question generation, and answer scoring are not
implemented.
