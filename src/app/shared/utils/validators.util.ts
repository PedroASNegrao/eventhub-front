import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Mirrors the backend's @FutureOrPresent constraint on EventRequestDTO.eventDate. */
export const futureOrPresentValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) {
    return null;
  }
  const value = new Date(control.value);
  const now = new Date();
  return value >= now ? null : { futureDate: true };
};
