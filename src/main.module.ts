import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { JwtAuthGuard } from './authentication/gaurd/jwt.auth.gaurd';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { config } from 'dotenv';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { CartModule } from './cart/cart.module';
config();

const path = join(__dirname, '../../assets');

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: 587,
        ignoreTLS: false,
        secure: false,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: process.env.SMTP_EMAIL,
      },
      template: {
        dir: path,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
    MongooseModule.forRoot(process.env.MONGODB, {
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    ProductModule,
    AuthenticationModule,
    UserModule,
    CartModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class MainModule {}
