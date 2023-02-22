import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    //create two dummy authors
    const author1 = await prisma.author.upsert({
        where: { email: 'author1@gmail.com' },
        update: {},
        create: {
            name: 'Author 1',
            email: 'author1@gmail.com',
            hashedPassword: 'hAsH3dPaSsWoRd'
        },
    });

    const author2 = await prisma.author.upsert({
        where: { email: 'author2@gmail.com' },
        update: {},
        create: {
            name: 'Author 2',
            email: 'author2@gmail.com',
            hashedPassword: 'hAsH3dPaSsWoRd'
        },
    });
            

    //create two dummy articles
    const post1 = await prisma.article.upsert({
        where: { title: 'Prisma adds support for MongoDB' },
        update: {},
        create: {
            title: 'Prisma adds support for MongoDB',
            body: "support for MongoDB is now available in Prisma. You can now connect to MongoDB databases with Prisma and use Prisma Client to query and mutate data in your MongoDB database.",
            description: " We are excited to share that today's Prisma ORM release adds support for MongoDB. You can now connect to MongoDB databases with Prisma and use Prisma Client to query and mutate data in your MongoDB database.",
            published: false,
            authorEmail: 'author1@gmail.com'
        },
    });

    const post2 = await prisma.article.upsert({
        where: { title: 'Prisma adds support for MySQL' },
        update: {},
        create: {
            title: 'Prisma adds support for MySQL',
            body: "support for MySQL is now available in Prisma. You can now connect to MySQL databases with Prisma and use Prisma Client to query and mutate data in your MySQL database.",
            description: " We are excited to share that today's Prisma ORM release adds support for MySQL. You can now connect to MySQL databases with Prisma and use Prisma Client to query and mutate data in your MySQL database.",
            published: true,
            authorEmail: 'author2@gmail.com'
        },
    });

    const post3 = await prisma.article.upsert({
        where: { title: 'Prisma adds support for PostgreSQL' },
        update: {},
        create: {
            title: 'Prisma adds support for PostgreSQL',
            body: "support for PostgreSQL is now available in Prisma. You can now connect to PostgreSQL databases with Prisma and use Prisma Client to query and mutate data in your PostgreSQL database.",
            description: " We are excited to share that today's Prisma ORM release adds support for PostgreSQL. You can now connect to PostgreSQL databases with Prisma and use Prisma Client to query and mutate data in your PostgreSQL database.",
            published: true,
            authorEmail: 'author1@gmail.com'
        },
    });

    console.log({ post1, post2, post3, author1, author2 });
}

// Execute main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma client at the end
        await prisma.$disconnect();
    });