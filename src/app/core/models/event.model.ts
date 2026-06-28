import { User } from './user.model';

export interface Event {
  id: string;
  title: string;
  description: string | null;
  eventDate: string;
  location: string;
  organizer: User;
}

export interface EventRequest {
  title: string;
  description: string | null;
  eventDate: string;
  location: string;
  organizerId: string;
}
