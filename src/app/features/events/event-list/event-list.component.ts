import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, MapPin, Calendar, CircleAlert } from 'lucide-angular';
import { EventService } from '../../../core/services/event.service';
import { Event } from '../../../core/models/event.model';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { isPastEvent } from '../../../shared/utils/date.util';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [RouterLink, DatePipe, LucideAngularModule, BadgeComponent],
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  private readonly eventService = inject(EventService);

  readonly events = signal<Event[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly skeletons = [0, 1, 2, 3];

  readonly MapPinIcon = MapPin;
  readonly CalendarIcon = Calendar;
  readonly AlertCircleIcon = CircleAlert;

  readonly isPastEvent = isPastEvent;

  ngOnInit(): void {
    this.eventService.getAll().subscribe({
      next: (events) => {
        this.events.set(events);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load events. Please try again later.');
        this.loading.set(false);
      },
    });
  }
}
