FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:20-slim

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package*.json ./
COPY prisma ./prisma

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "dist/index.js"]
