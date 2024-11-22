import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePlactisDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNumber()
  readonly is_recyclable: number;
}
