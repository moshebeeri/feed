import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from './entities/community.entity';

@Injectable()
export class CommunityService {

  constructor(private readonly neo4jService: Neo4jService) {}
  create(createCommunityDto: CreateCommunityDto) {
    //id: randomUUID(),
    return this.neo4jService.write(`
            CREATE (c:Community {
                name: $name,
                title: $title,
                image: $image
            })
            RETURN c, ID(c) AS id
        `, {
          name: createCommunityDto['name'],
          title: createCommunityDto['title'] || null,
          image: createCommunityDto['image'] || null,
    })
      .then(({ records }) => {
        console.log(records[0].get('id'))
        new Community(records[0].get('c'), createCommunityDto['name'], createCommunityDto['image'])
      })
  }

  findAll() {
    return `This action returns all community`;
  }

  findOne(id: number) {
    return `This action returns a #${id} community`;
  }

  update(id: number, updateCommunityDto: UpdateCommunityDto) {
    return `This action updates a #${id} community`;
  }

  remove(id: number) {
    return `This action removes a #${id} community`;
  }
}
