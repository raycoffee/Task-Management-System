import { IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../user/user.entity';

export class AuthDto {
 @ApiProperty({
   example: 'john_doe',
   description: 'Unique username'
 })
 @IsString()
 @IsNotEmpty() 
 username: string;

 @ApiProperty({
   example: 'password123',
   description: 'Password - minimum 6 characters'
 })
 @IsString()
 @IsNotEmpty()
 @MinLength(6, { message: 'Password must be at least 6 characters long' })
 password: string;

 @ApiProperty({
   enum: UserRole,
   description: 'User role (USER or ADMIN)',
   required: false
 })
 @IsEnum(UserRole)
 @IsOptional()
 role?: UserRole;
}