import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './guards/auth-guard';
import { PolicyComponent } from './policy/policy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'RMA Forest' } },
  { path: 'compliance', component: ComplaintsComponent, data: { title: 'Canal de Denuncias - RMA Forest' } },
  { path: 'admin-login', component: AdminLoginComponent, data: { title: 'Acceso Administrativo - RMA Forest' } },
  { path: 'admin', component: AdminPanelComponent,canActivate: [AuthGuard], data: { title: 'Panel de Administración - RMA Forest' } },
  { path: 'policy', component: PolicyComponent, data: { title: 'Política de Calidad - RMA Forest' } },
  { path: '**', redirectTo: '' },
];
