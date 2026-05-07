import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../services/api/api.service';
import { CaptchaService } from '../services/captcha.service';
import { AlertService } from '../services/alert.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { ChileanDateAdapter } from '../adapters/chilean-date-adapter';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: ChileanDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' }
  ]
})
export class ComplaintsComponent {
  loading = false;
  maxDatePicker: Date;

  form = {
    isAnonymous: false,
    name: '',
    email: '',
    subject: '',
    subjectOther: '',
    relationship: '',
    relationshipOther:'',
    location: '',
    incidentDate: '',
    message: '',
    accused: ''
  };

  subjectOptions = [
    'Compliance',
    'Delito comercial',
    'Acoso Laboral',
    'Acoso Sexual',
    'Delito ambiental',
    'Violencia en el trabajo',
    'Otros'
  ];

  relationshipOptions = [
    'Postulante',
    'Cliente',
    'Colaborador',
    'Proveedor',
    'Contratista',
    'Otro'
  ];

  constructor(
    private api: ApiService, 
    private captchaService: CaptchaService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef
  ) {
    this.maxDatePicker = new Date();
  }

onSubjectChange() {
  if (this.form.subject !== 'Otros') {
    this.form.subjectOther = '';
  }
  
}

onRelationshipChange() {
  if (this.form.relationship !== 'Otro') {
    this.form.relationshipOther = '';
  }
}

  async onSubmit() {
    
  
    this.loading = true;
    const finalSubject = this.form.subject === 'Otros' ? this.form.subjectOther : this.form.subject;
    const finalRelationship = this.form.relationship === 'Otro' ? this.form.relationshipOther : this.form.relationship;

    if (this.form.subject === 'Otros' && !this.form.subjectOther) {
      this.alertService.warning('Debes especificar el asunto');
      return;
    }

    if (this.form.relationship === 'Otro' && !this.form.relationshipOther) {
      this.alertService.warning('Debes especificar tu relación con la empresa');
      return;
    }
    if (!this.form.subject) {
      this.alertService.warning('Debes seleccionar un asunto');
      return;
    }
    if (this.form.subject === 'Otros' && !this.form.subjectOther) {
      this.alertService.warning('Debes especificar el asunto');
      return;
    }
  
    if (!this.form.relationship) {
      this.alertService.warning('Debes seleccionar tu relación con la empresa');
      return;
    }
    if (this.form.relationship === 'Otro' && !this.form.relationshipOther) {
      this.alertService.warning('Debes especificar tu relación con la empresa');
      return;
    }
  
    if (!this.form.message) {
      this.alertService.warning('Debes describir los hechos con detalle');
      return;
    }
  
    if (!this.form.isAnonymous && !this.form.email) {
      this.alertService.warning('Email es requerido para denuncias no anónimas');
      return;
    }
    let captchaToken = '';
  try {
    captchaToken = await this.captchaService.executeCaptcha('submit_complaint');
  } catch (error) {
    this.alertService.error('Error al verificar el captcha. Intenta nuevamente.');
    return;
  }
  
    this.api.post('complaints/create', {
      subject: finalSubject,
      message: this.form.message,
      relationship: finalRelationship,
      location: this.form.location,
      incidentDate: this.form.incidentDate,
      accused: this.form.accused,
      name: this.form.isAnonymous ? null : this.form.name,
      email: this.form.isAnonymous ? null : this.form.email,
      isAnonymous: this.form.isAnonymous,
      recaptchaToken:captchaToken
    }).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.alertService.success("Su denuncia ha sido enviada correctamente, pronto nos pondremos en contacto contigo.");
          this.form = {
            isAnonymous: false,
            name: '',
            email: '',
            subject: '',
            subjectOther: '',
            relationship: '',
            relationshipOther: '',
            location: '',
            incidentDate: '',
            message: '',
            accused: ''
          };
          this.cdr.detectChanges();
        } else {
          this.alertService.error('Error al enviar la denuncia. Intenta nuevamente.');
        }
        this.loading = false;
      },
      error: (err) => {
        this.alertService.error('Error al enviar la denuncia. Intenta nuevamente.');
        this.loading = false;
      }
    });
  }
}