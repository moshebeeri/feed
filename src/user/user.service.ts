import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Neo4jService } from 'nest-neo4j/dist';
import { EncryptionService } from 'src/encryption/encryption.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(private readonly neo4jService: Neo4jService) {}

  create(createUserDto: CreateUserDto) {
    return this.neo4jService.write(`
            CREATE (u:User {
                id: randomUUID(),
                name: $name,
                image: $image
            })
            RETURN u
        `, {
          name: createUserDto['name'],
          image: createUserDto['image'] || null,
    })
      .then(({ records }) => new User(records[0].get('u'), createUserDto['name'], createUserDto['image']))
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
