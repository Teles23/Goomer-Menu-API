import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;

module.exports = {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: databaseUrl,
  },
};
