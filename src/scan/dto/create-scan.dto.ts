import { IsNotEmpty, IsString } from 'class-validator';

export class CreateScantDto {
  @IsString()
  @IsNotEmpty()
  data: string;
}
