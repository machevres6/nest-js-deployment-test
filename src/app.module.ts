import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    PrismaModule, 
    ArticlesModule, 
    AuthorsModule,
    ConfigModule.forRoot(
      {
        isGlobal:
          true,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
