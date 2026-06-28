export function isPastEvent(eventDate: string): boolean {
  return new Date(eventDate).getTime() < Date.now();
}
