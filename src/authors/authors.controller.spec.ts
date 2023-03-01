import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

const authorId = uuidv4();
const authorName = 'Test Cat 1';
const authorEmail = 'author@email.com';
const authorPassword = 'password';

describe('Author Controller', () => {
    let controller: AuthorsController;
    let service: AuthorsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthorsController],
            providers: [
                {
                    provide: AuthorsService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue([
                            { authorId, name: authorName, email: authorEmail, hashedPassword: authorPassword},
                            {
                                name: 'Test Cat 2',
                                email: 'test1@gmail.com',
                                hashedPassword: 'aldkf',
                                authorId,
                            },
                            {
                                name: 'Test Cat 3',
                                gmail: 'test2@gmail.com',
                                hashedPassword: 'alkdfjalkdfj',
                                authorId,
                            },
                        ]),
                        findOne: jest.fn().mockImplementation((authorId: string) =>
                            Promise.resolve({
                                name: authorName,
                                email: authorEmail,
                                hashedPassword: authorPassword,
                                authorId,
                            }),
                        ),
                        create: jest
                            .fn()
                            .mockImplementation((dto: CreateAuthorDto) =>
                                Promise.resolve({ authorId, ...dto }),
                            ),
                        update: jest
                            .fn()
                            .mockImplementation((authorId: string, dto: UpdateAuthorDto) =>
                                Promise.resolve({ authorId, ...dto }),
                            ),
                        removeOne: jest.fn().mockResolvedValue({ deleted: true }),
                    }
                }
            ]
        }).compile();

        controller = module.get<AuthorsController>(AuthorsController);
        service = module.get<AuthorsService>(AuthorsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('get Authors', () => {
        it('should get an array of authors', async () => {
            await expect(controller.findAll()).resolves.toEqual([
                { authorId, name: authorName, email: authorEmail, hashedPassword: authorPassword },
                {
                    name: 'Test Cat 2',
                    email: 'test1@gmail.com',
                    hashedPassword: 'aldkf',
                    authorId,
                },
                {
                    name: 'Test Cat 3',
                    gmail: 'test2@gmail.com',
                    hashedPassword: 'alkdfjalkdfj',
                    authorId,
                },
            ]);
        });
    });

    describe('getById', () => {
        it('should get a single Author', async () => {
            await expect(controller.findOne('a strange id')).resolves.toEqual({
                name: authorName,
                email:authorEmail,
                hashedPassword: authorPassword,
                authorId: 'a strange id',
            });
            await expect(controller.findOne('a different id')).resolves.toEqual({
                name: authorName,
                email: authorEmail,
                hashedPassword: authorPassword,
                authorId: 'a different id',
            });
        });
    });

    describe('new Author', () => {
        it('should create a new author', async () => {
            const newAuthorDto: CreateAuthorDto = {
                name: 'New Cat 1',
                email: authorEmail,
                hashedPassword: authorPassword,
            };
            await expect(controller.create(newAuthorDto)).resolves.toEqual({
                authorId,
                ...newAuthorDto,
            });
        });
    });

    describe('update Author', () => {
        it('should update a Author', async () => {
            const newAuthorDto: UpdateAuthorDto = {
                email: 'new_email@email.com',
            };
            await expect(controller.update(authorId, newAuthorDto)).resolves.toEqual({
                authorId,
                ...newAuthorDto,
            });
        });
    });
});
