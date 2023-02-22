import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  create(createAuthorDto: CreateAuthorDto) {
    return this.prisma.author.create({
      data: createAuthorDto
    });
  }

  findAll() {
    return this.prisma.author.findMany();
  }

  findOne(authorId: string) {
    return this.prisma.author.findUnique({
      where: {
        authorId
      }
    });
  }

  update(id: string, updateAuthorDto: UpdateAuthorDto) {
    return this.prisma.author.update({
      where: { authorId: id },
      data: updateAuthorDto,
    });
  }

  remove(id: string) {
    return this.prisma.author.delete({
      where: {
        authorId: id
      }
    });
  }
}
