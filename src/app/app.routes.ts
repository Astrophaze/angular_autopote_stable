import { Routes } from '@angular/router';
import { PartListComponent } from './components/part-list/part-list';
import { CategoryFormComponent } from './components/category-form-component/category-form-component';
import { BrandFormComponent } from './components/brand-form-component/brand-form-component';
import { PartFormComponent } from './components/part-form-component/part-form-component';

export const routes: Routes = [
  { path: '', redirectTo: 'parts', pathMatch: 'full' },
  { path: 'parts', component: PartListComponent },
  { path : 'CategoryForm', component: CategoryFormComponent },
  { path: 'BrandForm', component: BrandFormComponent },
  { path: 'PartForm', component: PartFormComponent },
];