
# Fetching Github User Profiles From Github User API


## Prerequisites
- Node.js (version 14 or higher)
- PostgreSQL (version 12 or higher)
- npm

## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/OforiAlexander/GitUsers-API-Fetch.git
   ```

2. cd to the backend directory:
   ```bash
   cd gitusers-api-fetch
   ```

3. Install npm dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the `backend` directory and update the environment variables if needed:
   ```
   cp .env.example .env
   ```

5. Set up the PostgreSQL database:
   - Create a new database named `users`.
   - Ensure the database connection details in the `.env` file match your local PostgreSQL setup.

6. Create the PostgreSQL database:
   ```bash
   psql -U postgres
   CREATE DATABASE users;
   \c
   ```

8. Start the backend server:
   ```bash
   npm start
   ```

The backend server will start running on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../git_users_app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will start running at `http://localhost:3001`.
- I advice that you change the PORT env variable to 5000 is you want to use localhost:3000 for the frontend

## Project Structure

### Backend

The backend follows the Model-View-Controller (MVC) architecture and uses the Sequelize ORM for interacting with the PostgreSQL database.

```
backend/
├── config/
│   └── db.js
├── controllers/
│   └── UsersController.js
├── models/
│   └── GitUsers.js
├── routes/
│   └── web.js
├── index.js
├── .env.example
└── package.json
└── validate.js
```

### Frontend

The frontend is built using React and utilizes the Tailwind CSS library for styling.

```
frontend/
├── src/
│   ├── components/
│   │   └── GitUsers.js
│   ├── App.js
│   └── index.js
├── package.json
```

## Environment Variables

The backend project uses the following environment variables:

- `PORT`: The port number for the backend server (default is `3000`).
- `NODE_ENV`: The environment.
- `DB_CONNECTION`: The host address for the PostgreSQL database.
- `DB_PORT`: The port number for the PostgreSQL database.
- `DB_USER`: The username for the PostgreSQL database.
- `DB_PASSWORD`: The password for the PostgreSQL database.
- `DB_NAME`: The name of the PostgreSQL database.
- `GITHUB_API_URL`: The base URL for the GitHub API.


Follow the endpoints at the router/web.js to test the api

## API Endpoints

The backend project provides the following API endpoints:

1. `POST /users`: Fetches and stores GitHub user data in the database.
2. `GET /users`: Retrieves all the stored GitHub user data from the database.
