import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {JwtRefreshStrategy} from "./strategies/jwt-refresh.strategy";
import {MailModule} from "../mail/mail.module";

@Module({
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({}),
    MailModule
  ]
})
export class AuthModule {}
