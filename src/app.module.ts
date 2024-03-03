import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {PrismaModule} from './prisma/prisma.module';
import {AuthModule} from './auth/auth.module';
import {PasswordsModule} from './passwords/passwords.module';
import {MailModule} from './mail/mail.module';
import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {GMAIL_MAIL_PASSWORD, GMAIL_MAIL_USERNAME} from "./environments/environments";
import {WalletsModule} from './wallets/wallets.module';
import {ProtectionMiddleware} from "./middleware/protection.middleware";
import { CurrenciesModule } from './currencies/currencies.module';
import { WalletTransactionsModule } from './wallet-transactions/wallet-transactions.module';

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

      UsersModule,
      PrismaModule,
      AuthModule,
      PasswordsModule,
      MailModule,
      WalletsModule,
      CurrenciesModule,
      WalletTransactionsModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(ProtectionMiddleware)
            .forRoutes({path: "*", method: RequestMethod.ALL})
    }
}
