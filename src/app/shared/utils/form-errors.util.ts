import { AbstractControl } from '@angular/forms';

const MESSAGES: Record<string, (error: any) => string> = {
  required: () => 'This field is required.',
  email: () => 'Enter a valid email address.',
  minlength: (error) => `Must be at least ${error.requiredLength} characters.`,
  maxlength: (error) => `Must be at most ${error.requiredLength} characters.`,
  futureDate: () => 'The date must be today or in the future.',
};

/** Returns the first friendly validation message for a control, or null if it's valid/untouched. */
export function getFirstErrorMessage(control: AbstractControl | null): string | null {
  if (!control || !control.errors || (!control.touched && !control.dirty)) {
    return null;
  }
  const [key, error] = Object.entries(control.errors)[0];
  return MESSAGES[key]?.(error) ?? 'Invalid value.';
}
