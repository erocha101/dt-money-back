import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTransaction(data: CreateTransactionDTO) {
    const createdTransaction = await this.prismaService.transaction.create({
      data,
    });

    return createdTransaction;
  }

  async deleteTransaction(id: string) {
    const existingTransaction = await this.prismaService.transaction.findUnique(
      {
        where: {
          id,
        },
      },
    );

    if (!existingTransaction) {
      throw new BadRequestException('Transaction not found');
    }
    const deletedTransaction = await this.prismaService.transaction.delete({
      where: {
        id,
      },
    });

    return deletedTransaction;
  }

  async updateTransaction({ id, ...data }: UpdateTransactionDTO) {
    const existingTransaction = await this.prismaService.transaction.findUnique(
      {
        where: {
          id,
        },
      },
    );

    if (!existingTransaction) {
      throw new BadRequestException('Transaction not found');
    }
    const updatedTransaction = await this.prismaService.transaction.update({
      where: {
        id,
      },
      data,
    });

    return updatedTransaction;
  }

  async listAll() {
    const transactions = await this.prismaService.transaction.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
    return transactions;
  }
}
