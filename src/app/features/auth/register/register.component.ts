import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { getFirstErrorMessage } from '../../../shared/utils/form-errors.util';
import { UserService } from '../../../core/services/user.service';
import { UserRole } from '../../../core/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly serverError = signal<string | null>(null);

  readonly roles: { value: UserRole; label: string }[] = [
    { value: 'ATTENDEE', label: 'Attendee — I want to discover and join events' },
    { value: 'ORGANIZER', label: 'Organizer — I want to create and manage events' },
  ];

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    role: ['ATTENDEE' as UserRole, [Validators.required]],
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

    this.userService.register(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (error: HttpErrorResponse) => {
        this.loading.set(false);
        this.serverError.set(
          error.status === 409 ? 'This email is already registered.' : 'Something went wrong. Please try again.'
        );
      },
    });
  }
}
