
import { IsNotEmpty, Validate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Max } from 'class-validator';
import { MaxWords } from "src/validate/max-words.validator";


class User {

  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  role: [string]
  image: string
  @IsNotEmpty()
  country: string
}

export class CreateUserDto {
  @ValidateNested()
  @Type(() => User)
  public user: User
}


