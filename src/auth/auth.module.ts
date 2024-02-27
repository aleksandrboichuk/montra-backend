import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {JwtRefreshStrategy} from "./strategies/jwt-refresh.strategy";
import {MailModule} from "../mail/mail.module";
import {AuthResolver} from "./auth.resolver";

@Module({
  exports: [AuthService],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    AuthResolver
  ],
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({}),
    MailModule
  ]
})
export class AuthModule {}
