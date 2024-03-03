import { Module } from '@nestjs/common';
import { WalletTransactionsController } from './wallet-transactions.controller';
import { WalletTransactionsService } from './wallet-transactions.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  controllers: [WalletTransactionsController],
  providers: [WalletTransactionsService, JwtAuthGuard],
  imports: [
     PrismaModule
  ]
})
export class WalletTransactionsModule {}
