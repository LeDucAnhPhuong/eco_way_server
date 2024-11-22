import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateQRCodetDto {
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
export class ReturnQRCodetDto {
  @IsNotEmpty()
  @IsString()
  readonly message: string;

  @IsNotEmpty()
  @IsString()
  readonly qr_url: string;

  @IsNotEmpty()
  @IsString()
  readonly id_qr: string;
}
