import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

const articleId = uuidv4();
const authorEmail = 'author1@gmail.com';
const articleTitle = 'Test Article 1';
const articleDescription = 'Test Article 1 Description';
const articleBody = 'Test Article 1 Body';
const articlePublished = true;
const createdAtArticle = Date.now();

describe('Articles Controller', () => {
    let controller: ArticlesController;
    let service: ArticlesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ArticlesController],
            providers: [
                {
                    provide: ArticlesService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue([
                            { articleId, title: articleTitle, description: articleDescription, body: articleBody, published: articlePublished, createdAt: createdAtArticle, authorEmail },
                            { articleId, title: 'Test Article 2', description: 'Test Article 2 Description', body: 'Test Article 2 Body', published: true, createdAt: createdAtArticle, authorEmail },
                            { articleId, title: 'Test Article 3', description: 'Test Article 3 Description', body: 'Test Article 3 Body', published: false, createdAt: createdAtArticle, authorEmail },
                        ]),
                        findOne: jest.fn().mockImplementation((articleId: string) => 
                            Promise.resolve({
                                articleId,
                                title: articleTitle,
                                description: articleDescription,
                                body: articleBody,
                                published: articlePublished,
                                createdAt: createdAtArticle,
                                authorEmail,
                            })
                        ),
                        create: jest.fn().mockImplementation((dto: CreateArticleDto) => 
                            Promise.resolve({
                                articleId, 
                                ...dto
                            })
                        ),
                        update: jest.fn().mockImplementation((articleId: string, dto: UpdateArticleDto) => 
                            Promise.resolve({ articleId, ...dto })
                        ),
                        removeOne: jest.fn().mockResolvedValue({ deleted: true }),
                    }
                }
            ]
        }).compile();

        controller = module.get<ArticlesController>(ArticlesController);
        service = module.get<ArticlesService>(ArticlesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('get articles', () => {
        it('should get an array of articles', async () => {
            await expect(controller.findAll()).resolves.toEqual([
                { articleId, title: articleTitle, description: articleDescription, body: articleBody, published: articlePublished, createdAt: createdAtArticle, authorEmail },
                { articleId, title: 'Test Article 2', description: 'Test Article 2 Description', body: 'Test Article 2 Body', published: true, createdAt: createdAtArticle, authorEmail },
                { articleId, title: 'Test Article 3', description: 'Test Article 3 Description', body: 'Test Article 3 Body', published: false, createdAt: createdAtArticle, authorEmail },
            ]);
        });
    });

    describe('getById', () => {
        it('should get a single Article', async () => {
            await expect(controller.findOne('a strange id')).resolves.toEqual({
                articleId: 'a strange id',
                title: articleTitle,
                description: articleDescription,
                body: articleBody,
                published: articlePublished,
                createdAt: createdAtArticle,
                authorEmail,
            });
            await expect(controller.findOne('a different id')).resolves.toEqual({
                articleId: 'a different id',
                title: articleTitle,
                description: articleDescription,
                body: articleBody,
                published: articlePublished,
                createdAt: createdAtArticle,
                authorEmail,
            });
        });
    });

    describe('new article', () => {
        it('should create a new article', async () => {
            const newArticleDto: CreateArticleDto = {
                title: 'Test Article 4',
                description: 'Test Article 4 Description',
                body: 'Test Article 4 Body',
                published: false,
                authorEmail,
            };
            await expect(controller.create(newArticleDto)).resolves.toEqual({
                articleId,
                ...newArticleDto,
            });
        });
    });

    describe('update article', () => {
        it('should update a Article', async () => {
            const updateArticleDto: UpdateArticleDto = {
                title: 'Test Article 5',
                description: 'Test Article 5 Description',
                body: 'Test Article 5 Body',
                published: true,
            };
            await expect(controller.update(articleId, updateArticleDto)).resolves.toEqual({
                articleId,
                ...updateArticleDto,
            });
        });
    });
});