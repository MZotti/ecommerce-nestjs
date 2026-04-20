import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

import * as bcrypt from 'bcrypt';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const rolesExists = await prisma.role.findFirst({
        where: { name: 'ADMIN' }
    });

    if (!rolesExists) {
        await prisma.role.createMany({
            data: [
                { name: 'ADMIN' },
                { name: 'MANAGER' },
                { name: 'OPERATIONAL' },
                { name: 'ANALYST' },
                { name: 'CUSTOMER' },
            ]
        })

        console.log("Roles created!");
    }

    const adminUserExists = await prisma.user.findFirst({
        where: { email: 'admin@admin.com' }
    });

    if (!adminUserExists) {
        const hashedPassword = await bcrypt.hash('qwe123', 10);

        await prisma.user.create({
            data: {
                name: 'Admin',
                email: 'admin@admin.com',
                password: hashedPassword,
                roleId: 1
            }
        })

        console.log("Admin user created!");
    }

    const categories = await prisma.category.createMany({
        data: [
            {
                name: 'Graphic Card',
                slug: 'graphic-card'
            },
            {
                name: 'CPU',
                slug: 'cpus'
            },
        ],
        skipDuplicates: true,
    });

    console.log("Categories created!");
}
main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });