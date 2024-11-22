import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSizeDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNumber()
  readonly point: number;
}
