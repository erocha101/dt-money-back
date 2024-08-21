import { IsOptional } from 'class-validator';
import { CreateTransactionDTO } from './create-transaction.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateTransactionDTO extends PartialType(CreateTransactionDTO) {
  @IsOptional()
  id?: string;
}
