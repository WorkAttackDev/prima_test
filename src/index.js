"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const fs_1 = require("fs");
const app = express_1.default();
const PORT = parseInt(process.env.PORT + "", 10) || 5555;
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
    fs_1.writeFileSync("text.txt", JSON.stringify(users));
    app.get("/", (req, res) => {
        res.json(users);
    });
    app.listen(PORT, () => {
        console.log("server is running");
    });
}
main()
    .catch((e) => {
    throw e;
})
    .finally(async () => {
    await prisma.$disconnect();
});
// Denilson
