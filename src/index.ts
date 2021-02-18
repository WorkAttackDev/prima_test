import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { writeFileSync } from "fs";

const app = express();

const PORT = parseInt(process.env.PORT+"", 10) || 5555;

async function main() {
  // await prisma.user.create({
  //   data: { email: "deni@workattackangola.com", name: "Denilon" },
  // });

  const users = await prisma.user.findMany({
    include: {
      links: true,
    },
  });

  console.log(users);
  writeFileSync("text.txt", JSON.stringify(users));



  app.get("/", (req, res) => {
    res.json(users);
  });

  app.listen(PORT, ()=> {
    console.log("server is running");
  })
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


  // Denilson