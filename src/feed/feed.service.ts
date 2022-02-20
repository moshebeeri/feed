import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';

@Injectable()
export class FeedService {
  constructor(
    //@Inject(REQUEST) private readonly request: Request,
    private readonly neo4jService: Neo4jService
) {}

  async paginatedUserFeed(userId: string, pageIndex: number, pageSize: number) {
    var feedRes = await this.neo4jService.read(`
      MATCH (u:User{id:$userId})
      WITH u
      MATCH (u)-[:FOLLOW]->(c:Community)<-[:POSTED_TO]-(p:Post)<-[:POSTED]-(poster:User)

      WITH u, p, poster

      OPTIONAL MATCH ()-[like:LIKE]->(p)

      WITH u, p, poster, (count(like)*80+size(p.body)*20) as score

      RETURN p
      ORDER BY u.country = poster.countery DESC, score DESC, p.created DESC
    `, {
      userId,
      pageIndex,
      pageSize
    }
  );

  var ex = `
    MATCH (u:User {id: $userId})

    WITH u, randomUUID() AS uuid

    CREATE (a:Article {
        id: uuid,
        createdAt: datetime(),
        updatedAt: datetime()
    }) SET a += $article, a.slug = apoc.text.slug($article.title +' '+ uuid)

    CREATE (u)-[:POSTED]->(a)

    FOREACH ( name IN $tagList |
        MERGE (t:Tag {name: name})
        ON CREATE SET t.id = randomUUID(),  t.slug = apoc.text.slug(name)

        MERGE (a)-[:HAS_TAG]->(t)
    )

    RETURN u,
        a,
        [ (a)-[:HAS_TAG]->(t) | t ] AS tagList,
        exists((a)<-[:FAVORITED]-(u)) AS favorited,
        size((a)<-[:FAVORITED]-()) AS favoritesCount
`

  return feedRes.records
  }
}
