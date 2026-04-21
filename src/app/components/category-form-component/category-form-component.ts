import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-category-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './category-form-component.html',
  styleUrl: './category-form-component.scss',
})
export class CategoryFormComponent {
  formulaire: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {
    this.formulaire = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  sendForm() {
    if (this.formulaire.valid) {
      const categoryData = new FormData();
      categoryData.append('name', this.formulaire.get('name')?.value);
      categoryData.append('description', this.formulaire.get('description')?.value);

      this.apiService.postCategory(categoryData).subscribe({
        next: (response) => {
          console.log("Catégorie ajoutée avec succès", response);
          this.formulaire.reset();
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout de la catégorie", err);
        },
      });
    } else {
      console.error("Formulaire invalide");
    }
  }
}
