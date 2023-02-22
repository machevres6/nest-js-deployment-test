import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: createArticleDto
    });
  }

  findAll() {
    return this.prisma.article.findMany({
      where: {
        published: true
      }
    });
  }

  findAllDrafts() {
    return this.prisma.article.findMany({
      where: {
        published: false
      }
    });
  }

  findOne(articleId: string) {
    return this.prisma.article.findUnique({
      where: {
        articleId
      }
    });
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { articleId: id },
      data: updateArticleDto,
    });
  }

  remove(id: string) {
    return this.prisma.article.delete({
      where: {
        articleId: id
      }
    });
  }
}
