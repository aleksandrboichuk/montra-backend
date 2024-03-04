import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {PrismaModule} from "../prisma/prisma.module";
import {LocalStrategy} from "../auth/strategies/local.strategy";
import {JwtStrategy} from "../auth/strategies/jwt.strategy";
import {JwtRefreshStrategy} from "../auth/strategies/jwt-refresh.strategy";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
      PrismaModule,
      forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [UsersService]
})
export class UsersModule {}
