import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  success(message: string, title: string = 'Éxito') {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonColor: '#2e7d32',
      timer: 3000,
      showConfirmButton: true
    });
  }

  error(message: string, title: string = 'Error') {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonColor: '#2e7d32'
    });
  }

  warning(message: string, title: string = 'Atención') {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      confirmButtonColor: '#2e7d32'
    });
  }

  info(message: string, title: string = 'Información') {
    Swal.fire({
      icon: 'info',
      title: title,
      text: message,
      confirmButtonColor: '#2e7d32'
    });
  }
}