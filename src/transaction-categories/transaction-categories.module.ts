import { Module } from '@nestjs/common';
import { TransactionCategoriesService } from './transaction-categories.service';
import { TransactionCategoriesController } from './transaction-categories.controller';
import {PrismaModule} from "../prisma/prisma.module";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Module({
  providers: [TransactionCategoriesService, JwtAuthGuard],
  controllers: [TransactionCategoriesController],
  imports: [PrismaModule]
})
export class TransactionCategoriesModule {}
