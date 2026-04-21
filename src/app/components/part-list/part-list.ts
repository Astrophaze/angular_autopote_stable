import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { AuthService } from '../../services/auth-service';
import { Part } from '../../interfaces/part.interface';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-part-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './part-list.html',
  styleUrl: './part-list.scss',
})
export class PartListComponent implements OnInit {
  parts: Part[] = [];
  categories = signal<any[]>([]);
  brands = signal<any[]>([]);
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 12;
  categoryFilter: string = '';
  brandFilter: string = '';
  isLoading = signal<boolean>(false);

  constructor(private partService: ApiService, public authService: AuthService) {}

  get nbPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
    this.loadParts();
  }

  loadParts(): void {
    
    this.isLoading.set(true);
    this.partService.getParts(this.currentPage, this.categoryFilter, this.brandFilter).subscribe({
      next: (data) => {
        this.parts = data.member;
        this.isLoading.set(false);
        this.totalItems = data.totalItems;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des pièces', err);
        this.isLoading.set(false);
      },
    });
  }

  loadCategories(): void {
    this.partService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data.member);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  loadBrands(): void {
    this.partService.getBrands().subscribe({
      next: (data) => {
        this.brands.set(data.member);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  goToPage(page: number, category: string = '', brand: string = ''): void {
    if (page < 1 || page > this.nbPages) return;
    this.currentPage = page;
    this.categoryFilter = category;
    this.brandFilter = brand;

    this.loadParts();
  }

  onCategoryChange(e: Event): void {
    const value = (e.target as HTMLSelectElement).value;
    this.categoryFilter = value;
    this.currentPage = 1;
    this.loadParts();
  }

  onBrandChange(e: Event): void {
    const value = (e.target as HTMLSelectElement).value;
    this.brandFilter = value;
    this.currentPage = 1;
    this.loadParts();
  }

  getStockClass(part: Part): string {
    if (part.stock === 0) return 'danger';
    if (part.stock <= 3) return 'warning';
    return 'success';
  }

  getStockLabel(part: Part): string {
    if (part.stock === 0) return 'Rupture';
    if (part.stock <= 3) return `Stock faible (${part.stock})`;
    return `En stock (${part.stock})`;
  }

  get lastItemIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }
}
