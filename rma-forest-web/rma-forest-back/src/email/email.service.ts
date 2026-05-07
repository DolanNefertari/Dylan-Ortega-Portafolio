import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { info } from 'console';

@Injectable()
export class EmailService implements OnModuleInit{
  private transporter;
  private etherealUrl: string | null = null;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const env = this.configService.get('NODE_ENV') || 'development';
    const smtpType = this.configService.get('SMTP_TYPE') || 'ethereal';

    if (env !== 'production' && smtpType === 'ethereal') {
      // Crear cuenta automática en Ethereal
      const testAccount = await nodemailer.createTestAccount();
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      this.etherealUrl = testAccount.web;
      
      console.log('\n╔══════════════════════════════════════════════════════════╗');
      console.log('║      EMAIL DE PRUEBA CONFIGURADO - ETHEREAL              ║');
      console.log('╠══════════════════════════════════════════════════════════╣');
      console.log(`║   Ver correos en: ${testAccount.web}                     ║`);
      console.log(`║   Usuario: ${testAccount.user}                           ║`);
      console.log(`║   Contraseña: ${testAccount.pass}                        ║`);
      console.log('╚══════════════════════════════════════════════════════════╝\n');
    } else {
      // Producción: usar SMTP real
      this.transporter = nodemailer.createTransport({
        host: this.configService.get('SMTP_HOST'),
        port: parseInt(this.configService.get('SMTP_PORT') || '587'),
        secure: false,
        auth: {
          user: this.configService.get('SMTP_USER'),
          pass: this.configService.get('SMTP_PASS'),
        },
      });
    }
  }

  async sendEmail(options: {
    to: string;
    subject: string;
    html: string;
    from?: string;
    replyTo?: string;
  }) {
    try {
      const htmlWithTemplate = `  <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${options.subject}</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Roboto, Arial, sans-serif;
          background-color: #f4f7f9;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .email-header {
          background-color: #ffffff;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        .email-body {
          padding: 15px;
          color: #1d3439;
          line-height: 1.5;
        }
        .email-footer {
          background-color: #e8f5e9;
          padding: 15px;
          text-align: center;
          font-size: 12px;
          color: #555;
          border-top: 1px solid #c8e6c9;
        }
        .button {
          display: inline-block;
          background-color: #2e7d32;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 40px;
          margin-top: 20px;
          font-weight: 500;
        }
        .highlight {
          color: #2e7d32;
          font-weight: bold;
        }
        @media (max-width: 600px) {
          .email-body {
            padding: 20px;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 10px; background-color: #f4f7f9;">
      <div class="email-container">
        <div class="email-header">
          <img src="https://rmaforest.cl/assets/logos/logo-horizontal-recortado.png" alt="RMA Forest"
          style="max-height: 100px; display: block; object-fit: contain;margin: 0 auto;"> 
        </div>
        <div class="email-body">
          ${options.html}
        </div>
        <div class="email-footer">
          <p>RMA Forest SPA – Los Militares #5620 oficina 1813, Las Condes, Santiago, Chile</p>
          <p>Este es un mensaje automático, por favor no responder a este correo.</p>
        </div>
      </div>
    </body>
    </html>`;
      const mailOptions = {
        from: options.from || `"RMA Forest" <${this.configService.get('SMTP_USER')}>`,
        to: options.to,
        subject: options.subject,
        html: htmlWithTemplate,
        replyTo: options.replyTo,
      };

      console.log('📧 Intentando enviar correo a:', options.to);
      const info = await this.transporter.sendMail(mailOptions);

      if (this.etherealUrl) {
        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log(`📧 Correo enviado a: ${options.to}`);
        console.log(`📧 Preview: ${previewUrl}\n`);
      }
      
      console.log('📧 Correo enviado correctamente');
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }
  }
}