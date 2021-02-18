import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // await prisma.user.create({
  //   data: { email: "deni@workattackangola.com", name: "Denilson" },
  // });

  const users = await prisma.user.findMany({
    include: {
      links: true,
    },
  });

  console.log(users);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
