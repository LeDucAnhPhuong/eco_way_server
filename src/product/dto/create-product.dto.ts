import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly brand: string;

  @IsNotEmpty()
  @IsString()
  readonly size_name: string;

  @IsNotEmpty()
  @IsString()
  readonly plactis_name: string;
}
