import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import {PrismaModule} from "../prisma/prisma.module";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AdminGuard} from "../auth/guards/admin.guard";

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService, JwtAuthGuard, AdminGuard],
  imports: [PrismaModule],
  exports: [CurrenciesService]
})
export class CurrenciesModule {}
