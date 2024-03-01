import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PasswordModule } from './password/password.module';
import { MailModule } from './mail/mail.module';
import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {GMAIL_MAIL_PASSWORD, GMAIL_MAIL_USERNAME} from "./environments/environments";

@Module({
  imports: [
      // defining env file
      MailerModule.forRoot({
          transport: `smtps://${GMAIL_MAIL_USERNAME}:${GMAIL_MAIL_PASSWORD}@smtp.gmail.com`,
          template: {
              dir: process.cwd() + '/src/static/templates/',
              adapter: new HandlebarsAdapter(),
              options: {
                  strict: true,
              },
          },
      }),

      UserModule,
      PrismaModule,
      AuthModule,
      PasswordModule,
      MailModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
