import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PasswordModule } from './password/password.module';
import { MailModule } from './mail/mail.module';
import {MailerModule} from "@nestjs-modules/mailer";
import {GraphQLModule} from "@nestjs/graphql";
import {PrismaModule} from "./prisma/prisma.module";
import {MailConfig} from "./mail/config/mail.config";
import {GraphQLConfig} from "./graphql/config/graphql.config";
import {ApolloDriver} from "@nestjs/apollo";
import {GQL_ENDPOINT, NODE_ENV} from "@environments";

@Module({
  imports: [

      MailerModule.forRootAsync({
          useClass: MailConfig
      }),

      GraphQLModule.forRoot({
          driver: ApolloDriver,
          typePaths: ['./**/*.graphql'],
          path: `${GQL_ENDPOINT!}`,
          cors: true,
          bodyParserConfig: {limit: '50mb'},
          installSubscriptionHandlers: true,
          formatError: (error) => {
              return NODE_ENV === "production"
                  ? error.extensions.originalError
                  : error
          },
          playground: NODE_ENV !== 'production' && {
              tracing: NODE_ENV !== 'production',
              installSubscriptionHandlers: true,
              uploads: {
                  maxFieldSize: 2, // 1mb
                  maxFileSize: 20, // 20mb
                  maxFiles: 5
              }
          }
      }),
      PrismaModule,
      UserModule,
      AuthModule,
      PasswordModule,
      MailModule,
  ]
})
export class AppModule {}
