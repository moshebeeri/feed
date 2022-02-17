
import { IsNotEmpty, Validate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Max } from 'class-validator';
import { MaxWords } from "src/validate/max-words.validator";


class Post {
  @IsNotEmpty()
  @Max(60)
  title: string;

  @IsNotEmpty()
  @Validate(MaxWords, [150], {
    message: 'Message exeed maximum of 150 words'
  })
  summery: string

  @IsNotEmpty()
  body: string

  @IsNotEmpty()
  communityId: number

  @IsNotEmpty()
  useId: number

  approved: boolean
}

export class CreatePostDto {
  @ValidateNested()
  @Type(() => Post)
  post: Post
}
