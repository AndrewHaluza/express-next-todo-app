## Setup Instructions

> **Disclaimer**: All scripts and commands in this project are implemented based on Unix commands. If you are using a different operating system, you may need to adjust them accordingly.

> **Note**: Configure DB params

### All In One

1. Prepare environment:
   ```bash
   # from root folder

   # copy .env files - requires adjust credentials to DB
   npm run cp-env:be
   npm run cp-env:fe

   # switch nodejs version to be able use latest features of nodejs
   nvm use
   ```

2. Start the application using dev mode:
   ```bash
   npm run dev
   ```

### Docker Setup

1. Prepare environment files:

   ```bash
   cd backend && cp .env.example .env.compose
   cd frontend && cp .env.example .env
   ```

2. Start the application using Docker:
   ```bash
   docker-compose up
   ```


### Backend

1. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

2. Initialize the database:

   ```bash
   npm run db:init
   ```

3. Install dependencies and start the backend:

   ```bash
   cd backend
   npm i
   npm run db:init
   npm run start
   ```

4. To run tests:
   ```bash
   npm run test:db:init
   npm run test
   ```

#### dev mode

```bash
# install nvm if not installed
nvm use

npm run dev
```

### Frontend

1. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

2. Install dependencies, build, and start the frontend:
   ```bash
   cd frontend
   npm i
   npm run build
   npm run start
   ```

