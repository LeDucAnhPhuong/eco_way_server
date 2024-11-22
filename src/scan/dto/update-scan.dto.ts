import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly id_user: string;
}
