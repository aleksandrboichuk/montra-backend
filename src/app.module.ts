import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PasswordModule } from './password/password.module';
import { MailModule } from './mail/mail.module';
import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
  imports: [
      // defining env file
      ConfigModule.forRoot({
        envFilePath: `.env.${process.env.NODE_ENV}`
      }),

      MailerModule.forRoot({
          transport: `smtps://${process.env.MAIL_USERNAME}:${process.env.MAIL_PASSWORD}@smtp.gmail.com`,
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
