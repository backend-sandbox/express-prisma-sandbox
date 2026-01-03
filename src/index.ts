import app from "./app";
import env from "./env";
import { prisma } from "../prisma/client";
import { createRedisClient, disconnectRedis } from "./redis";

async function main(): Promise<void> {
  // * Connect to database
  await prisma.$connect();
  console.log("Connected to database successfully");

  // * Connect to Redis
  await createRedisClient();

  app.listen(env.PORT, () => {
    console.log(`Server is running at http://${env.HOST}:${env.PORT}`);
    console.log(`\nAPI docs are available at http://${env.HOST}:${env.PORT}/api-docs`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await disconnectRedis();
  })
  .catch(async (error) => {
    console.error("Error starting server:", error);
    await prisma.$disconnect();
    await disconnectRedis();
    process.exit(1);
  });
