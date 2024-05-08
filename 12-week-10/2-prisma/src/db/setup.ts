import { prisma } from "../index";


export async function dropTables() {
    await prisma.todo.deleteMany({});
    await prisma.user.deleteMany({});
}

module.exports = { dropTables };
