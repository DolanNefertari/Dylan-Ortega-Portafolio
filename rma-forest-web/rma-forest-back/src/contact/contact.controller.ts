import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    @Post('send')
    async sendContact(@Body() body: {
      nombre: string;
      email: string;
      mensaje: string;
      privacy: boolean;
      recaptchaToken: string;
    }) {
      if (!body.nombre || !body.email || !body.mensaje) {
        return { success: false, message: 'Todos los campos son obligatorios' };
      }
      if (!body.privacy) {
        return { success: false, message: 'Debes aceptar la política de privacidad' };
      }
      if (!this.isValidEmail(body.email)) {
        return { success: false, message: 'El email no es válido' };
      }
      if (!body.recaptchaToken) {
        return { success: false, message: 'El captcha es obligatorio' };
      }
  
      const result = await this.contactService.sendEmail(body);
      return result;
    }
  
    private isValidEmail(email: string): boolean {
      const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
      return re.test(email);
    }
}
