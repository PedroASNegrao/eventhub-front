import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, CalendarDays, LogOut, PlusCircle } from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly currentUser$ = this.authService.currentUser$;

  readonly CalendarDaysIcon = CalendarDays;
  readonly PlusCircleIcon = PlusCircle;
  readonly LogOutIcon = LogOut;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
