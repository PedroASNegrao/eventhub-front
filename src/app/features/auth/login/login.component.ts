import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LucideAngularModule, CalendarDays } from 'lucide-angular';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { getFirstErrorMessage } from '../../../shared/utils/form-errors.util';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent, LucideAngularModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly serverError = signal<string | null>(null);

  readonly CalendarDaysIcon = CalendarDays;

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  readonly getErrorMessage = (controlName: keyof typeof this.form.controls) =>
    getFirstErrorMessage(this.form.get(controlName));

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.serverError.set(null);

    this.authService.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/events']);
      },
      error: (error: HttpErrorResponse) => {
        this.loading.set(false);
        this.serverError.set(
          error.status === 401 ? 'Invalid email or password.' : 'Something went wrong. Please try again.'
        );
      },
    });
  }
}
