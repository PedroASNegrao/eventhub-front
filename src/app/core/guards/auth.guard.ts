import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.ready$.pipe(
    filter((ready) => ready),
    take(1),
    map(() => authService.isAuthenticated() || router.createUrlTree(['/login']))
  );
};
