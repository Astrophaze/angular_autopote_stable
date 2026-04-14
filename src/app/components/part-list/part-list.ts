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
  isLoading = signal<boolean>(false);

  constructor(private partService: ApiService) {}

  ngOnInit(): void {
    this.loadParts();
  }

  loadParts(): void {
    this.isLoading.set(true);
    this.partService.getParts().subscribe({
      next: (data) => {
        this.parts = data.member;
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des pièces', err);
        this.isLoading.set(false);
      }
    });
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
}