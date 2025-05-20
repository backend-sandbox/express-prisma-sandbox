## Installation

```sh
npm install
npm run prisma:generate -- --allow-no-models
```

## Development

```sh
npm run db:migrate
npm run dev
```

## Linting/Formatting

```sh
npm run lint
npm run format
```

## Testing

```sh
npm run test
```

## Deploying

```sh
# install dependencies
npm install --include=dev

# transpile prisma schema
npm run prisma:generate -- --allow-no-models

# transpile TypeScript into JavaScript
npm run build
npm run sentry:sourcemaps

# apply database migrations/seeders
npm run db:migrate
npm run db:seed

# start application
npm run start
```
