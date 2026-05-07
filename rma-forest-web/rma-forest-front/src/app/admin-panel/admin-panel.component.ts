import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatGridListModule,
  ],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  complaints: any[] = [];
  loading = false;
  error = '';
  editingId: number | null = null;
  tempStatus: string = '';

  statusOptions = [
    { value: 'received', label: 'Recibida' },
    { value: 'in_review', label: 'En revisión' },
    { value: 'closed', label: 'Cerrada' }
  ];

  constructor(private api: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router) {}

  ngOnInit() {
    this.loadComplaints();
  }

  loadComplaints() {
    this.loading = true;
    this.error = '';

    this.api.get('complaints/all').subscribe({
      next: (res: any) => {
        this.complaints = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading complaints:', err);
        this.error = 'Error al cargar las denuncias';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  startEdit(complaint: any) {
    this.editingId = complaint.id;
    this.tempStatus = complaint.status;
    this.cdr.detectChanges();
  }

  cancelEdit() {
    this.editingId = null;
    this.tempStatus = '';
    this.cdr.detectChanges();
  }

  saveStatus(complaint: any) {
    if (this.tempStatus === complaint.status) {
      this.cancelEdit();
      return;
    }

    const complaintId = complaint.id;
    const newStatus = this.tempStatus;

    this.api.put(`complaints/${complaintId}/status`,{ status: newStatus }).subscribe({
      next: () => {
        this.complaints = this.complaints.map(c => 
          c.id === complaintId ? { ...c, status: newStatus } : c
        );
        
        console.log(`Complaint #${complaintId} status updated to ${newStatus}`);
        this.cancelEdit();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error updating status:', err);
        alert('Error al actualizar el estado');
        
        this.loadComplaints();
        this.cancelEdit();
        this.cdr.detectChanges();
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'received': return 'status-received';
      case 'in_review': return 'status-review';
      case 'closed': return 'status-closed';
      default: return '';
    }
  }

  getStatusLabel(status: string): string {
    const option = this.statusOptions.find(opt => opt.value === status);
    return option ? option.label : status;
  }

  logout() {
    sessionStorage.removeItem('adminAuth');
    this.router.navigate(['/admin-login']);
  }
  exportToCSV() {
    const headers = [
      'ID',
      'Fecha y Hora',
      'Estado',
      'Asunto',
      'Mensaje',
      'Anónimo',
      'Nombre',
      'Email'
    ];
  
    const formatDateTime = (date: string) => {
      const d = new Date(date);
      const dia = d.getDate().toString().padStart(2, '0');
      const mes = (d.getMonth() + 1).toString().padStart(2, '0');
      const año = d.getFullYear();
      const horas = d.getHours().toString().padStart(2, '0');
      const minutos = d.getMinutes().toString().padStart(2, '0');
      return `${dia}/${mes}/${año} ${horas}:${minutos}`;
    };
  
    const rows = this.complaints.map(complaint => [
      complaint.id,
      formatDateTime(complaint.createdAt),
      this.getStatusLabel(complaint.status),
      `"${complaint.subject.replace(/"/g, '""')}"`,
      `"${complaint.message.replace(/"/g, '""')}"`,
      complaint.isAnonymous ? 'Sí' : 'No',
      complaint.name || '-',
      complaint.email || '-'
    ]);
  
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
  
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const fecha = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    link.setAttribute('href', url);
    link.setAttribute('download', `denuncias_${fecha}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  getStatusClassForSelect(status: string): string {
    switch (status) {
      case 'received': return 'status-received-bg';
      case 'in_review': return 'status-review-bg';
      case 'closed': return 'status-closed-bg';
      default: return '';
    }
  }
}
