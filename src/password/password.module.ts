import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import {PrismaModule} from "../prisma/prisma.module";
import {UserModule} from "../user/user.module";
import {MailModule} from "../mail/mail.module";

@Module({
  providers: [PasswordService],
  controllers: [PasswordController],
  imports: [
    PrismaModule,
    UserModule,
    MailModule
  ],
})
export class PasswordModule {}
