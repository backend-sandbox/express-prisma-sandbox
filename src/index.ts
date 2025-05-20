import "./instrument";

import env from "./env";
import app from "./app";
import { prisma } from "../prisma/client";

async function main(): Promise<void> {
  await prisma.$connect();

  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
