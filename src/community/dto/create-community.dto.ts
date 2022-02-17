import { IsNotEmpty, Validate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Max } from 'class-validator';
import { MaxWords } from "src/validate/max-words.validator";


class Community {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Max(60)
  title: string;

  @IsNotEmpty()
  image: string
}

export class CreateCommunityDto {
  @ValidateNested()
  @Type(() => Community)
  community: Community
}
