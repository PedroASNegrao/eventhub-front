/** Mirrors ErrorResponseDTO returned by the global exception handler. */
export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

/** Mirrors ValidationErrorResponseDTO returned for @Valid request body failures. */
export interface ApiValidationErrorResponse extends ApiErrorResponse {
  fieldErrors: Record<string, string>;
}
