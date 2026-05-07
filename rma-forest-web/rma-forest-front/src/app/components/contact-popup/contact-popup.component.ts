import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiService } from '../../../services/api/api.service';
import { CaptchaService } from '../../services/captcha.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-contact-popup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './contact-popup.component.html',
  styleUrls: ['./contact-popup.component.scss']
})
export class ContactPopupComponent {
  @Output() closed = new EventEmitter<void>();

  visible = false;
  loading = false;
  form = {
    nombre: '',
    email: '',
    mensaje: '',
    privacy: false
  };

  constructor(
    private api: ApiService,
    private captchaService: CaptchaService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef
  ) {}

  open() {
    this.visible = true;
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.visible = false;
    document.body.style.overflow = '';
    this.closed.emit();
  }

  async onSubmit() {
    
    if (!this.form.privacy) {
      this.alertService.warning('Debes aceptar la política de privacidad');
      return;
    }

    this.loading = true;
    try {
      const token = await this.captchaService.executeCaptcha('form_contact');
      const payload = { ...this.form, recaptchaToken: token };

    this.api.post('contact/send', payload).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.alertService.success("Su mensaje ha sido enviado correctamente, pronto nos pondremos en contacto con usted.");
          this.form = { nombre: '', email: '', mensaje: '', privacy: false };
          this.close();
          this.cdr.detectChanges();
        }
        this.loading = false;
      },
      error: () => {
        this.alertService.error('Error de conexión con el servidor');
        this.loading = false;
      }
    });
    
  } catch (error) {
    this.alertService.error('Error al verificar el captcha. Intenta nuevamente.');
    this.loading = false;
  }
  }
}