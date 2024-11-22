import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateScantDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly success: boolean;

  @IsNotEmpty()
  @IsString()
  readonly processed_image: string;

  @IsNotEmpty()
  @IsString()
  readonly detected_label: string;
}
