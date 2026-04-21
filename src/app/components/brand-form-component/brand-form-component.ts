import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-brand-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './brand-form-component.html',
  styleUrl: './brand-form-component.scss',
})
export class BrandFormComponent {
  formulaire: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.formulaire = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      country: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  sendForm() {
    if (this.formulaire.valid) {
      const brandData = {
        name: this.formulaire.get('name')?.value,
        country: this.formulaire.get('country')?.value
      };

      this.apiService.postBrand(brandData).subscribe({
        next: (response) => {
          console.log("Marque ajoutée avec succès", response);
          this.formulaire.reset();
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout de la marque", err);
        },
      });
    } else {
      console.error("Formulaire invalide");
    }
  }
}
