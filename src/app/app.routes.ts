import { Routes } from '@angular/router';
import { PartListComponent } from './components/part-list/part-list';

export const routes: Routes = [
  { path: '', redirectTo: 'parts', pathMatch: 'full' },
  { path: 'parts', component: PartListComponent },
];