import { Module } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { PasswordsController } from './passwords.controller';
import {PrismaModule} from "../prisma/prisma.module";
import {UsersModule} from "../users/users.module";
import {MailModule} from "../mail/mail.module";

@Module({
  providers: [PasswordsService],
  controllers: [PasswordsController],
  imports: [
    PrismaModule,
    UsersModule,
    MailModule
  ],
})
export class PasswordsModule {}
