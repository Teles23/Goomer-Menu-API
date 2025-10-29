#!/bin/sh
echo " Executando migrações do Prisma..."
npx prisma migrate deploy

echo " Migrações concluídas. Iniciando aplicação..."
node dist/index.js
