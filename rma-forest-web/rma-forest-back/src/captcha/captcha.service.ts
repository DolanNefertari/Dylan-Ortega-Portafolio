import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { config } from 'dotenv';
config();

@Injectable()
export class CaptchaService {
  constructor(private httpService: HttpService) {}

  async verifyToken(token: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService.post('https://www.google.com/recaptcha/api/siteverify', null, {
          params: {
            secret: process.env.RECAPTCHA_SECRET_KEY,
            response: token,
          },
        })
      );
      return response.data.success && response.data.score >= 0.5;
    } catch {
      return false;
    }
  }
}