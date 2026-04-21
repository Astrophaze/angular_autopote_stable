import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getToken() != null) {
    return true; 
  }

  // C'est un équivalent à router.navigate(['/login']) mais qui est plus adapté pour les guards, car il retourne une UrlTree qui indique où rediriger l'utilisateur, plutôt que de faire une redirection immédiate. Cela permet au système de routage d'Angular de gérer la redirection de manière plus fluide et de conserver l'état de navigation.
  return router.createUrlTree(['/login']);
};
