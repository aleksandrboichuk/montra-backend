import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import {JwtStrategy} from "../auth/strategies/jwt.strategy";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  providers: [WalletsService, JwtStrategy],
  controllers: [WalletsController],
  imports: [
      PrismaModule
  ]
})
export class WalletsModule {}
