import { ForbiddenException, Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { WatchListHandler } from 'src/validate/watch-list.validator';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {

  constructor(private readonly neo4jService: Neo4jService) {}

  async create(createPostDto: CreatePostDto) {

    var wash = new WatchListHandler()
    var fullText = createPostDto['title'] + ' ' + createPostDto['summery'] + ' ' + createPostDto['body']
    //TODO: pass user object
    if (!wash.validateAndInform(fullText, null)) {
      throw new ForbiddenException('This post does not complies with watchlist policy')
    }

    const res = await this.neo4jService.write(`
          MATCH (u:User {id: $userId})

          MATCH (c:Community {id: $communityId})

          WITH u, c


          CREATE (p:Post {
              id: randomUUID(),
              created: timestamp(),
              title: $title,
              summery: $summery,
              body: $body,
              approved: $approved
          })

          CREATE (u)-[:POSTED]->(p)-[:POSTED_TO]->(c)

          RETURN p
        `, {
          title: createPostDto['title'] ,
          summery: createPostDto['summery'] ,
          body: createPostDto['body'],
          communityId: createPostDto['communityId'],
          userId: createPostDto['userId'],
          approved: false
        })
      return new Post(res.records[0].get('p'),
        createPostDto['title'],
        createPostDto['summery'],
        createPostDto['body'],
        createPostDto['approved'],
        )
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

// title: string;

// @IsNotEmpty()
// @Validate(MaxWords, [150], {
//   message: 'Message exeed maximum of 150 words'
// })
// summery: string

// @IsNotEmpty()
// body: string

// @IsNotEmpty()
// communityId: number

// @IsNotEmpty()
// useId: number

// approved: boolean
