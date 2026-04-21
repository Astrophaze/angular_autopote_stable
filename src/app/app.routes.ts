import { Routes } from '@angular/router';
import { PartListComponent } from './components/part-list/part-list';
import { CategoryFormComponent } from './components/category-form-component/category-form-component';
import { BrandFormComponent } from './components/brand-form-component/brand-form-component';
import { PartFormComponent } from './components/part-form-component/part-form-component';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'parts', pathMatch: 'full' },
  { path: 'parts', component: PartListComponent },
  { path: 'CategoryForm', component: CategoryFormComponent, canActivate: [authGuard] },
  { path: 'BrandForm', component: BrandFormComponent, canActivate: [authGuard] },
  { path: 'PartForm', component: PartFormComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
];
