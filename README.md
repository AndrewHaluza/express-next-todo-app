## Setup Instructions

> **Disclaimer**: All scripts and commands in this project are implemented based on Unix commands. If you are using a different operating system, you may need to adjust them accordingly.

### Backend

1. Copy the environment file:

   ```
   cp .env.example .env
   ```

2. Initialize the database:

   ```
   npm run db:init
   ```

3. Install dependencies and start the backend:

   ```
   cd backend
   npm i
   npm run db:init
   npm run start
   ```

4. To run tests:
   ```
   npm run test:db:init
   npm run test
   ```

#### dev mode

```
// install nvm if not installed
nvm use

npm run dev
```

### Frontend

1. Copy the environment file:

   ```
   cp .env.example .env
   ```

2. Install dependencies, build, and start the frontend:
   ```
   cd frontend
   npm i
   npm run build
   npm run start
   ```

### Docker Setup

1. Prepare environment files:

   ```
   cd backend && cp .env.example .env.compose
   cd frontend && cp .env.example .env
   ```

2. Start the application using Docker:
   ```
   docker-compose up
   ```
