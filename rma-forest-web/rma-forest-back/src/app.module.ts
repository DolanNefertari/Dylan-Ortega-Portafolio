import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import { ComplaintsService } from './complaints/complaints.service';
import { ComplaintsController } from './complaints/complaints.controller';
import { ComplaintsModule } from './complaints/complaints.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { CaptchaModule } from './captcha/captcha.module';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbType = configService.get('DB_TYPE') || 'sqlite';
        
        // SQLite para desarrollo
        if (dbType === 'sqlite') {
          return {
            type: 'sqlite',
            database: configService.get('DB_NAME') || 'database.sqlite',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true, 
            logging: false,
          };
        }
        
        // MySQL para producción
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: parseInt(configService.get('DB_PORT') || '3306'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
      ContactModule,
      ComplaintsModule,
      EmailModule,
      AuthModule,
      CaptchaModule,
    ],
  controllers: [AppController, ComplaintsController, AuthController],
  providers: [AppService, ComplaintsService, EmailService, AuthService],
})
export class AppModule {}
