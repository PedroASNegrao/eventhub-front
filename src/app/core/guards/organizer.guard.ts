import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

/** Assumes authGuard already ran first and guaranteed the user is authenticated. */
export const organizerGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.ready$.pipe(
    filter((ready) => ready),
    take(1),
    map(() => authService.hasRole('ORGANIZER') || router.createUrlTree(['/events']))
  );
};
