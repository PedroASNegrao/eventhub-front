export type UserRole = 'ORGANIZER' | 'ATTENDEE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
