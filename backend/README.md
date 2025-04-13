# Express Next Todo App - Backend

This is the backend service for the Express Next Todo App. It is built using Node.js, TypeScript, and Sequelize ORM.

## Table of Contents
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Pre-commit Hooks](#pre-commit-hooks)
- [Database Initialization](#database-initialization)
- [Testing](#testing)

## Getting Started


1. Set up environment variables:
    - Create a `.env` file in the root directory and configure it as needed.

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

## Scripts

The following scripts are available in the `package.json`:

- **`db:init`**: Initializes the database.
  ```bash
  npm run db:init
  ```
- **`dev`**: Starts the development server with live reload.
  ```bash
  npm run dev
  ```
- **`ts.check`**: Runs TypeScript type checking.
  ```bash
  npm run ts.check
  ```
- **`add-build`**: Adds the `dist` folder to Git.
  ```bash
  npm run add-build
  ```
- **`build`**: Compiles the TypeScript code.
  ```bash
  npm run build
  ```
- **`start`**: Starts the production server.
  ```bash
  npm run start
  ```
- **`test:db:init`**: Initializes the test database.
  ```bash
  npm run test:db:init
  ```
- **`test`**: Runs the test suite.
  ```bash
  npm run test
  ```

## Database Initialization

To initialize the database, run:
```bash
npm run db:init
```

If the database initialization fails, the process will continue with a warning.

## Testing

To initialize the test database, run:
```bash
npm run test:db:init
```

To execute the test suite, run:
```bash
npm run test
```

Make sure to configure the `.env.testing` file for the test environment.

## License

This project is licensed under the MIT License.