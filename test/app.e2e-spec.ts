import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from '../src/prisma-client-exception/prisma-client-exception.filter';


describe('App e2e', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => {
        const moduleRef =
            await Test.createTestingModule({
                imports: [AppModule],
            }).compile();

        app = moduleRef.createNestApplication();
        app.enableCors();
        app.useGlobalPipes(
            new ValidationPipe(
                { whitelist: true, forbidNonWhitelisted: true }
            )
        );
        const { httpAdapter } = app.get(HttpAdapterHost);
        app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

        await app.init();
        await app.listen(3333);

        prisma = app.get(PrismaService);
        await prisma.cleanDb();
        pactum.request.setBaseUrl('http://localhost:3333');
    });

    afterAll(() => {
        app.close();
    })

    describe('Authors', () => {
        it('should create an author', () => {
            return pactum.spec()
                .post('/authors')
                .withBody({
                    name: 'John Doe',
                    email: 'john_doe@gmail.com',
                    hashedPassword: '12345',
                })
                .expectStatus(201)
                .stores('authorId', 'id')
        });

        it('Should find all authors', () => {
            return pactum.spec()
                .get('/authors')
                .expectStatus(200)        
        });

        it('Should find one author', () => {
            return pactum.spec()
                .get('/authors/{id}')
                .withPathParams('id', '$S{authorId}')
                .expectStatus(200)        
        });
    });
});
