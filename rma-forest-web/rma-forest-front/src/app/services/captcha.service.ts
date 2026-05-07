import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare var grecaptcha: any;

@Injectable({ providedIn: 'root' })
export class CaptchaService {
  executeCaptcha(action: string): Promise<string> {
    return new Promise((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(environment.captchaSecret, { action })
          .then((token: string) => resolve(token))
          .catch((error: any) => reject(error));
      });
    });
  }
}