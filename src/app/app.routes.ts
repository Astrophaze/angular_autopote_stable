import { Routes } from '@angular/router';
import { PartListComponent } from './components/part-list/part-list';
import { CategoryFormComponent } from './components/category-form-component/category-form-component';

export const routes: Routes = [
  { path: '', redirectTo: 'parts', pathMatch: 'full' },
  { path: 'parts', component: PartListComponent },
  { path : 'CategoryForm', component: CategoryFormComponent },
];