import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AuthorsService } from './authors.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateAuthorDto } from './dto/create-author.dto';

const authorId = uuidv4();
const authorName1 = 'John Doe';
const authorEmail1 = 'john_doe@gmail.com';
const authorPassword1 = 'password';

const authorArray = [
    { authorId, name: authorName1, email: authorEmail1, hashedPassword: authorPassword1 },
    { authorId, name: 'Miguel', email: 'm_a@gmail.com', hashedPassword: 'password2'},
    { authorId, name: 'Adriel', email: 'a_m@gmail.com', hashedPassword: 'password3'},
];

const oneAuthor = authorArray[0];
const createAuthor: CreateAuthorDto = { name: authorName1, email: authorEmail1, hashedPassword: authorPassword1}

const db = {
    author: {
        findMany: jest.fn().mockResolvedValue(authorArray),
        findUnique: jest.fn().mockResolvedValue(oneAuthor),
        findFirst: jest.fn().mockResolvedValue(oneAuthor),
        create: jest.fn().mockReturnValue(createAuthor),
        save: jest.fn(),
        update: jest.fn().mockResolvedValue(oneAuthor),
        delete: jest.fn().mockResolvedValue(oneAuthor),
    },
};

describe('AuthorsService', () => {
    let service: AuthorsService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthorsService,
                {
                    provide: PrismaService,
                    useValue: db,
                },
            ],
        }).compile();

        service = module.get<AuthorsService>(AuthorsService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAll', () => {
        it('should return an array of authors', async () => {
            const authors = await service.findAll();
            expect(authors).toEqual(authorArray);
        });
    });

    describe('getOne', () => {
        it('should get a single author', () => {
            expect(service.findOne('a uuid')).resolves.toEqual(oneAuthor);
        });
    });

    describe('update one', () => {
        it('should update a single author', async () => {
            const author = await service.update('a uuid', {
                name: authorName1,
                email: authorEmail1,
                hashedPassword: authorPassword1,
            });
            expect(author).toEqual(oneAuthor);
        });
    });

    describe('create one', () => {
        it('should create a single author', async () => {
            const author = await service.create({
                name: authorName1,
                email: authorEmail1,
                hashedPassword: authorPassword1,
            });
            expect(author).toEqual(createAuthor);
        });
    });

    describe('delete one', () => {
        it('should delete a single author', async () => {
            const author = await service.remove('a uuid');
            expect(author).toEqual({
                authorId,
                name: authorName1,
                email: authorEmail1,
                hashedPassword: authorPassword1,
            });
        });
    });
});

