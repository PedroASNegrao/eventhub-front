import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { getFirstErrorMessage } from '../../../shared/utils/form-errors.util';
import { futureOrPresentValidator } from '../../../shared/utils/validators.util';
import { EventService } from '../../../core/services/event.service';
import { AuthService } from '../../../core/services/auth.service';
import { ApiValidationErrorResponse } from '../../../core/models/error.model';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './event-form.component.html',
})
export class EventFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly eventService = inject(EventService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly serverError = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    description: [''],
    eventDate: ['', [Validators.required, futureOrPresentValidator]],
    location: ['', [Validators.required, Validators.maxLength(255)]],
  });

  readonly getErrorMessage = (controlName: keyof typeof this.form.controls) =>
    getFirstErrorMessage(this.form.get(controlName));

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const organizerId = this.authService.currentUser?.id;
    if (!organizerId) {
      this.serverError.set('Your session has expired. Please sign in again.');
      return;
    }

    this.loading.set(true);
    this.serverError.set(null);

    const { title, description, eventDate, location } = this.form.getRawValue();

    this.eventService
      .create({
        title,
        description: description || null,
        eventDate: new Date(eventDate).toISOString(),
        location,
        organizerId,
      })
      .subscribe({
        next: (event) => {
          this.router.navigate(['/events', event.id]);
        },
        error: (error: HttpErrorResponse) => {
          this.loading.set(false);
          this.serverError.set(this.extractErrorMessage(error));
        },
      });
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    const body = error.error as ApiValidationErrorResponse | undefined;
    if (body?.fieldErrors) {
      return Object.values(body.fieldErrors)[0] ?? body.message;
    }
    return body?.message ?? 'Something went wrong. Please try again.';
  }
}
