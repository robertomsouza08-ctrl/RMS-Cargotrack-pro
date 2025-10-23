#!/bin/sh
set -e

# Apply Prisma migrations in production
if [ '$NODE_ENV' = 'production' ]; then
  npx prisma migrate deploy
fi

node dist/main.js
