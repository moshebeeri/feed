import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {

  constructor(private readonly neo4jService: Neo4jService) {}

  create(createPostDto: CreatePostDto) {
    return this.neo4jService.write(`
            CREATE (p:Post {
                title: $title,
                summery: $summery,
                body: $body,
                approved: $approved
            })
            RETURN p, ID(p) AS id
        `, {
          title: createPostDto['title'] ,
          summery: createPostDto['summery'] ,
          body: createPostDto['body'],
          approved: false
    })
      .then(({ records }) => {
        console.log(records[0].get('id'))
        new Post(records[0].get('p'),
          createPostDto['title'],
          createPostDto['summery'],
          createPostDto['body'],
          createPostDto['approved'],
        )
      })
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
