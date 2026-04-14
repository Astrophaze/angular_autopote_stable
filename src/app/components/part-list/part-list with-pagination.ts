import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Part } from '../../interfaces/part.interface';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-part-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './part-list.html',
  styleUrl: './part-list.scss'
})
export class PartListComponent implements OnInit {


  parts: Part[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 12;
  isLoading = signal<boolean>(false);

  constructor(private partService: ApiService) {}

  get nbPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  ngOnInit(): void {
    this.loadParts();
  }

  loadParts(): void {
    this.isLoading.set(true);
    this.partService.getParts().subscribe({
      next: (data) => {
        this.parts = data.member;
        this.totalItems = data.totalItems;
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des pièces', err);
        this.isLoading.set(false);
      }
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.nbPages) return;
    this.currentPage = page;
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