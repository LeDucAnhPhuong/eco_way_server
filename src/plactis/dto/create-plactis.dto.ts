import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlactisDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly is_recyclable: number;
}
