import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      // defining env file
      ConfigModule.forRoot({
        envFilePath: `.env.${process.env.NODE_ENV}`
      }),

      UserModule,
      PrismaModule,
      AuthModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
