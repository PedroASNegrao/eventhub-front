import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule, MapPin, Calendar, ArrowLeft, User } from 'lucide-angular';
import { EventService } from '../../../core/services/event.service';
import { Event } from '../../../core/models/event.model';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, LucideAngularModule, SpinnerComponent],
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly eventService = inject(EventService);

  readonly event = signal<Event | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly CalendarIcon = Calendar;
  readonly MapPinIcon = MapPin;
  readonly ArrowLeftIcon = ArrowLeft;
  readonly UserIcon = User;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('Event not found.');
      this.loading.set(false);
      return;
    }

    this.eventService.getById(id).subscribe({
      next: (event) => {
        this.event.set(event);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('This event could not be found.');
        this.loading.set(false);
      },
    });
  }
}
