import app from "./app";
import env from "./env";
import { prisma } from "../prisma/client";

async function main(): Promise<void> {
  await prisma.$connect();

  app.listen(env.PORT, () => {
    console.log(`Server is running at http://${env.HOST}:${env.PORT}`);
    console.log(`\nAPI docs are available at http://${env.HOST}:${env.PORT}/api-docs`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Error starting server:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
