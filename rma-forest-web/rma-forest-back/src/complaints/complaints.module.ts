import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplaintsController } from './complaints.controller';
import { ComplaintsService } from './complaints.service';
import { Complaint } from '../entities/complaints.entity';
import { EmailModule } from '../email/email.module';
import { CaptchaModule } from '../captcha/captcha.module';
import { EmailService } from '../email/email.service';
import { CaptchaService } from '../captcha/captcha.service';

@Module({
  imports: [TypeOrmModule.forFeature([Complaint]), EmailModule, CaptchaModule],
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
  exports: [TypeOrmModule],
})
export class ComplaintsModule {}