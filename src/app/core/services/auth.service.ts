import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, RefreshRequest, TokenResponse } from '../models/auth.model';
import { User, UserRole } from '../models/user.model';
import { decodeJwt, isTokenExpired } from './jwt.util';
import { UserService } from './user.service';

const ACCESS_TOKEN_KEY = 'eventhub_access_token';
const REFRESH_TOKEN_KEY = 'eventhub_refresh_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly userService = inject(UserService);
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  readonly currentUser$ = this.currentUserSubject.asObservable();

  /** Emits once the initial session restore (decode token + fetch user) has settled. */
  private readonly readySubject = new BehaviorSubject<boolean>(false);
  readonly ready$ = this.readySubject.asObservable();

  constructor() {
    // Deferred: calling this synchronously would re-enter AuthService's own DI
    // provider (via authInterceptor) before its constructor has finished running.
    queueMicrotask(() => this.restoreSession());
  }

  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<TokenResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap((tokens) => this.persistTokens(tokens)),
      switchMap((tokens) => this.loadCurrentUser(tokens.accessToken))
    );
  }

  refreshAccessToken(): Observable<TokenResponse> {
    const request: RefreshRequest = { refreshToken: this.getRefreshToken() ?? '' };
    return this.http.post<TokenResponse>(`${this.baseUrl}/refresh`, request).pipe(
      tap((tokens) => this.persistTokens(tokens))
    );
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    this.currentUserSubject.next(null);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  hasRole(role: UserRole): boolean {
    return this.currentUserSubject.value?.role === role;
  }

  private restoreSession(): void {
    const token = this.getAccessToken();
    const payload = token ? decodeJwt(token) : null;
    if (!token || !payload || isTokenExpired(payload)) {
      this.logout();
      this.readySubject.next(true);
      return;
    }
    this.loadCurrentUser(token).subscribe({
      error: () => {
        this.logout();
        this.readySubject.next(true);
      },
      complete: () => this.readySubject.next(true),
    });
  }

  private loadCurrentUser(accessToken: string): Observable<User> {
    const payload = decodeJwt(accessToken)!;
    return this.userService.getById(payload.userId).pipe(
      tap((user) => this.currentUserSubject.next(user))
    );
  }

  private persistTokens(tokens: TokenResponse): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  }
}
