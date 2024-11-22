import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSizeDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly point: number;
}
