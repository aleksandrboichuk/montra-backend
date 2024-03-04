import {forwardRef, Module} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import {JwtStrategy} from "../auth/strategies/jwt.strategy";
import {PrismaModule} from "../prisma/prisma.module";
import {CurrenciesModule} from "../currencies/currencies.module";

@Module({
  providers: [WalletsService, JwtStrategy],
  controllers: [WalletsController],
  imports: [
      PrismaModule,
      forwardRef(() => CurrenciesModule)
  ],
    exports: [
        WalletsService
    ]
})
export class WalletsModule {}
