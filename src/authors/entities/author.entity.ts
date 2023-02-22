import { Article, Author } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class AuthorEntity implements Author {
    @ApiProperty()
    authorId: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    hashedPassword: string;

    @ApiProperty()
    articles: Article[];
}
