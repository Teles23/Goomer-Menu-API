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
COPY start.sh ./start.sh

RUN chmod +x start.sh && npm install --omit=dev

EXPOSE 3000

CMD ["./start.sh"]
