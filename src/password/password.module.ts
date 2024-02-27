import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import {PrismaModule} from "../prisma/prisma.module";
import {UserModule} from "../user/user.module";
import {MailModule} from "../mail/mail.module";
import {PasswordResolver} from "./password.resolver";

@Module({
  providers: [PasswordService, PasswordResolver],
  imports: [
    PrismaModule,
    UserModule,
    MailModule
  ],
})
export class PasswordModule {}
