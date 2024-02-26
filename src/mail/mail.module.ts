import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import {MailConfig} from "./config/mail.config";

@Module({
  controllers: [MailController],
  providers: [MailService, MailConfig],
  exports: [MailService]
})
export class MailModule {}
