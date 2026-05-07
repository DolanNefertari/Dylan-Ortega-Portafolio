import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  username = '';
  password = '';
  loading = false;
  error = false;

  constructor(
    private router: Router,
    private http: HttpClient 
  ) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = true;
      return;
    }

    this.loading = true;
    this.error = false;

    this.http.post(`${environment.apiUrl}/auth/login`, {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        if (res.success) {
          sessionStorage.setItem('adminAuth', 'true');
          localStorage.setItem('token', res.token);
          this.router.navigate(['/admin']);
        } else {
          this.error = true;
          this.password = '';
        }
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.password = '';
        this.loading = false;
      }
    });
  }
}