# HR Recruitment & Interview Management Portal

## Project Overview
A MERN stack HR Recruitment portal with JWT authentication and role-based access for Admin, HR, Interviewer, and Candidate, including job management, candidate applications, interview scheduling, feedback, resume uploads, and dashboard reports.

## Project Structure

```text
HR Recruitment/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── server.js
└── frontend/
   ├── src/components/
   ├── src/pages/
   ├── src/services/
   └── src/App.jsx
```

## Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `backend/.env` with your own MongoDB Atlas credentials:
   ```text
   PORT=5000
   MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/hr-db?retryWrites=true&w=majority
   JWT_SECRET=replace_with_a_long_random_secret
   ```
4. Start server:
   ```bash
   npm start
   ```

The API starts at `http://localhost:5000`. Do not run `node app.js` from the repository root. `app.js` creates the Express application; `server.js` connects MongoDB and starts the HTTP server.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The Vite development server usually starts at `http://localhost:5173`. If that port is occupied, Vite reports the alternate port it selected.

Create `frontend/.env` when the API is not using the default URL:

```text
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/ping` - Health check
- `GET /api/departments` - List departments
- `POST /api/departments` - Create department (Admin)
- `GET /api/jobs` - List jobs
- `POST /api/jobs` - Create job (Admin)
- `POST /api/applications/apply` - Apply for job (Candidate)
- `GET /api/applications/my-applications` - Candidate applications
- `POST /api/interviews/schedule` - Schedule interview (Admin)
- `POST /api/feedback/submit` - Submit feedback (Interviewer)
- `POST /api/candidates/resume` - Upload resume (Candidate, multipart field: `resume`)
- `GET /api/candidates/me` - Get candidate profile (Candidate)

## Notes
- JWT authentication required for protected routes
- Role-based access enforced in middleware
- Application IDs are auto-generated and unique
- Jobs with status `Closed` cannot accept applications
- Interviews cannot be scheduled in the past
