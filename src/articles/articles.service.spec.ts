import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
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

const articleArray = [
    { articleId, title: articleTitle, description: articleDescription, body: articleBody, published: articlePublished, createdAt: createdAtArticle, authorEmail },
    { articleId, title: 'Test Article 2', description: 'Test Article 2 Description', body: 'Test Article 2 Body', published: true, createdAt: createdAtArticle, authorEmail },
    { articleId, title: 'Test Article 3', description: 'Test Article 3 Description', body: 'Test Article 3 Body', published: false, createdAt: createdAtArticle, authorEmail },
]

const oneArticle = articleArray[0];
const createArticle: CreateArticleDto = {
    authorEmail,
    title: articleTitle,
    description: articleDescription,
    body: articleBody,
    published: articlePublished,
}

const db = {
    article: {
        findMany: jest.fn().mockResolvedValue(articleArray),
        findUnique: jest.fn().mockResolvedValue(oneArticle),
        findFirst: jest.fn().mockResolvedValue(oneArticle),
        create: jest.fn().mockReturnValue(createArticle),
        save: jest.fn(),
        update: jest.fn().mockResolvedValue(oneArticle),
        delete: jest.fn().mockResolvedValue(oneArticle), 
    },
};


describe('ArticlesService', () => {
    let service: ArticlesService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ArticlesService,
                {
                    provide: PrismaService,
                    useValue: db,
                },
            ],
        }).compile();

        service = module.get<ArticlesService>(ArticlesService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAll', () => {
        it('Should return an array of articles', async () => {
            const articles = await service.findAll();
            expect(articles).toEqual(articleArray);
        });
    });

    describe('getOne', () => {
        it('should get a single author', () => {
            expect(service.findOne('a uuid')).resolves.toEqual(oneArticle);
        });
    });

    describe('update one', () => {
        it('should update a single article', async () => {
            const articles = await service.update('a uuid', {
                title: 'new title',
                published: false,
            });
            expect(articles).toEqual(oneArticle);
        });
    });

    describe('create one', () => {
        it('should create a single article', async () => {
            const articles = await service.create(createArticle);
            expect(articles).toEqual(createArticle);
        });
    });

    describe('delete one', () => {
        it('should delete a single article', async () => {
            const articles = await service.remove('a uuid');
            console.log(articles)
            expect(articles).toEqual({
                articleId,
                title: 'Test Article 1',
                description: 'Test Article 1 Description',
                body: 'Test Article 1 Body',
                published: true,
                createdAt: createdAtArticle,
                authorEmail
            });
        });
    });

});