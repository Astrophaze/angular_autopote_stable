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
      description: ['', [Validators.maxLength(500)]],
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
      const formData = new FormData();
      formData.append('name', this.formulaire.get('name')?.value);
      formData.append('description', this.formulaire.get('description')?.value);
      formData.append('brand', this.formulaire.get('brand')?.value);
      formData.append('category', this.formulaire.get('category')?.value);

      this.apiService.postPart(formData).subscribe({
        next: (response) => {
          console.log('Pièce ajoutée avec succès', response);
          this.formulaire.reset();
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout de la pièce", err.error);
        },
      });
    } else {
      console.error("Formulaire invalide");
    }
  }
}
