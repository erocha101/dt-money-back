import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';
import { Response } from 'express';

@Controller('/app/transaction')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/')
  async createTransaction(
    @Body() data: CreateTransactionDTO,
    @Res() res: Response,
  ) {
    const createdTransaction = await this.appService.createTransaction(data);
    return res.status(HttpStatus.CREATED).send(createdTransaction);
  }
  @Get('/')
  async listAll() {
    const transactions = await this.appService.listAll();
    return transactions;
  }

  @Delete('/:id')
  async deleteTransaction(@Param('id') id: string, @Res() res: Response) {
    await this.appService.deleteTransaction(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Put('/:id')
  async updateTransaction(
    @Param('id') id: string,
    @Body() data: UpdateTransactionDTO,
    @Res() res: Response,
  ) {
    const updatedTransaction = await this.appService.updateTransaction({
      ...data,
      id,
    });
    return res.status(HttpStatus.OK).send(updatedTransaction);
  }
}
