import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-part-form-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './part-form-component.html',
  styleUrl: './part-form-component.scss',
})
export class PartFormComponent implements OnInit {
  formulaire: FormGroup;
  brands: any[] = [];
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {
    this.formulaire = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      reference: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      part_condition: ['', [Validators.required]],
      isAvailable: [true],
      brand: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadBrands();
    this.loadCategories();
  }

  loadBrands() {
    this.apiService.getBrands().subscribe({
      next: (response) => {
        this.brands = response.member;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des marques", err);
      }
    });
  }

  loadCategories() {
    this.apiService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.member;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des catégories", err);
      }
    });
  }

  sendForm() {
    if (this.formulaire.valid) {
      const partData = {
        name: this.formulaire.get('name')?.value,
        reference: this.formulaire.get('reference')?.value,
        description: this.formulaire.get('description')?.value,
        price: this.formulaire.get('price')?.value,
        stock: this.formulaire.get('stock')?.value,
        part_condition: this.formulaire.get('part_condition')?.value,
        isAvailable: this.formulaire.get('isAvailable')?.value,
        createdAt: new Date().toISOString(),
        brand: `/api/brands/${this.formulaire.get('brand')?.value}`,
        category: `/api/categories/${this.formulaire.get('category')?.value}`
      };

      this.apiService.postPart(partData).subscribe({
        next: (response) => {
          console.log('Pièce ajoutée avec succès', response);
          this.formulaire.reset({ isAvailable: true });
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout de la pièce", err);
        },
      });
    } else {
      console.error("Formulaire invalide");
    }
  }
}
