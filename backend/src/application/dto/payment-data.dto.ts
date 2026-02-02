import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentDataDto {
  @ApiProperty({ example: 'tok_stagtest_xxx', description: 'Wompi card token from frontend' })
  @IsString()
  cardToken: string;

  @ApiProperty({ example: 'juan@example.com', description: 'Customer email for payment' })
  @IsEmail()
  customerEmail: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiJ9...', description: 'Wompi acceptance token' })
  @IsString()
  acceptanceToken: string;
}
