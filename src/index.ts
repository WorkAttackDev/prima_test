import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { writeFileSync } from "fs";

async function main() {
  await prisma.user.create({
    data: { email: "deni@workattackangola.com", name: "Denilon" },
  });

  const users = await prisma.user.findMany({
    include: {
      links: true,
    },
  });

  console.log(users);
  writeFileSync("text.txt", JSON.stringify(users));
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


  // Denilson