import {forwardRef, Module} from '@nestjs/common';
import { WalletTransactionsController } from './wallet-transactions.controller';
import { WalletTransactionsService } from './wallet-transactions.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {PrismaModule} from "../prisma/prisma.module";
import {WalletsModule} from "../wallets/wallets.module";
import {CurrenciesModule} from "../currencies/currencies.module";
import {TransactionCategoriesModule} from "../transaction-categories/transaction-categories.module";

@Module({
  controllers: [WalletTransactionsController],
  providers: [WalletTransactionsService, JwtAuthGuard],
  imports: [
     PrismaModule,
      forwardRef(() => WalletsModule),
      forwardRef(() => TransactionCategoriesModule),
  ],
})
export class WalletTransactionsModule {}
