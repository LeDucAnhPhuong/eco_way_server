import { IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly brand: string;

  @IsOptional()
  @IsString()
  readonly size_name: string;

  @IsOptional()
  @IsString()
  readonly plactis_name: string;
}
