import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CommunityModule } from './community/community.module';
import { UserModule } from './user/user.module';
import { FeedModule } from './feed/feed.module';
import { Neo4jModule } from 'nest-neo4j'
import { EncryptionService } from './encryption/encryption.service';
import { WatchlistModule } from './watchlist/watchlist.module';

@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: 'neo4j',
      host: 'localhost',
      port: 7687,
      username: 'neo4j',
      password: 'neo'
    }),
  PostModule, CommunityModule, UserModule, FeedModule, Neo4jModule, WatchlistModule],
  controllers: [AppController],
  providers: [AppService, EncryptionService],
})
export class AppModule {}
