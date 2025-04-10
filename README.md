## Backend

Add .env

```
cp .env.example .env
```

```
cd backend
npm i
npm run db:init
npm run start

// test
npm run test:db:init
npm run test

```

## Frontend

Add .env

```
cp .env.example .env
```

```
cd frontend
npm i
npm run build
npm run start

```

Docker variant

```
docker-compose up
```
