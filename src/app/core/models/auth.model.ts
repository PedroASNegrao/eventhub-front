export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

/** Mirrors TokenResponseDTO returned by /auth/login and /auth/refresh. */
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

/** Decoded shape of the access token's payload, used to derive the current user. */
export interface JwtPayload {
  sub: string;
  userId: string;
  role: 'ORGANIZER' | 'ATTENDEE';
  type: 'ACCESS' | 'REFRESH';
  iat: number;
  exp: number;
}
