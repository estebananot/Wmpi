import { Injectable, Inject } from '@nestjs/common';
import { Result } from '../../../common/result/result';
import type { TransactionRepositoryInterface } from '../../../domain/repositories/transaction.repository.interface';
import { TransactionResponseDto } from '../../dto/transaction-response.dto';

@Injectable()
export class GetTransactionUseCase {
  constructor(
    @Inject('TransactionRepositoryInterface')
    private readonly transactionRepository: TransactionRepositoryInterface,
  ) {}

  async execute(id: string): Promise<Result<TransactionResponseDto, Error>> {
    try {
      const transaction = await this.transactionRepository.findById(id);

      if (!transaction) {
        return Result.fail(new Error('Transaction not found'));
      }

      const response: TransactionResponseDto = {
        id: transaction.id,
        transactionNumber: transaction.transactionNumber,
        status: transaction.status,
        totalAmount: transaction.totalAmount,
        breakdown: {
          productAmount: transaction.productAmount,
          baseFee: transaction.baseFee,
          deliveryFee: transaction.deliveryFee,
        },
        createdAt: transaction.createdAt,
      };

      return Result.ok(response);
    } catch (error) {
      return Result.fail(error instanceof Error ? error : new Error('Failed to get transaction'));
    }
  }
}
