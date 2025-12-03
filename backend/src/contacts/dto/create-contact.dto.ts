import { IsString, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsString()
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber()
  phone: string;
}
