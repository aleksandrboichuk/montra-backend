import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
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
  controllers: [UserController],
  providers: [UserService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [UserService]
})
export class UserModule {}
