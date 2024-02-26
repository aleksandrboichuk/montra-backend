import {forwardRef, Module} from '@nestjs/common';
import { UserService } from './user.service';
import {PrismaModule} from "../prisma/prisma.module";
import {LocalStrategy} from "../auth/strategies/local.strategy";
import {JwtStrategy} from "../auth/strategies/jwt.strategy";
import {JwtRefreshStrategy} from "../auth/strategies/jwt-refresh.strategy";
import {AuthModule} from "../auth/auth.module";
import {UserResolver} from "./user.resolver";

@Module({
  imports: [
      PrismaModule,
      forwardRef(() => AuthModule)
  ],
  providers: [UserService, LocalStrategy, JwtStrategy, JwtRefreshStrategy, UserResolver],
  exports: [UserService]
})
export class UserModule {}
