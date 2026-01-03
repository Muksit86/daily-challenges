# ChallengerDaily Backend

Backend server for the ChallengerDaily app built with Express and Supabase.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the Server directory (copy from `.env.example`):

```bash
# Server Configuration
PORT=5000

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

**To get your Supabase credentials:**

1. Go to [Supabase](https://supabase.com/) and create a new project (or use an existing one)
2. Navigate to **Project Settings** > **API**
3. Copy:
   - **Project URL** → Use as `SUPABASE_URL`
   - **Anon/Public Key** → Use as `SUPABASE_ANON_KEY`

### 3. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000` by default.

## API Endpoints

### Authentication

#### `POST /api/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

#### `POST /api/auth/login`
Login with existing credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

#### `POST /api/auth/logout`
Logout current user.

#### `DELETE /api/auth/delete-account`
Delete user account (requires authentication).

**Headers:**
```
Authorization: Bearer {access_token}
```

#### `POST /api/auth/verify`
Verify session token.

**Headers:**
```
Authorization: Bearer {access_token}
```

### Health Check

#### `GET /api/health`
Check if the server is running.

## Tech Stack

- **Express** - Web framework
- **Supabase** - Backend as a Service (Authentication & Database)
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management
- **nodemon** - Auto-reload during development

## Notes

- Make sure your Supabase project has **Email Authentication** enabled in the Authentication settings
- The `.env` file is gitignored to protect sensitive credentials
- For production deployment, update `CLIENT_URL` to your frontend domain
