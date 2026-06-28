import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    <div class="flex items-center justify-center py-12" role="status">
      <span class="h-8 w-8 animate-spin rounded-full border-[3px] border-white/10 border-t-primary-400 shadow-glow-sm"></span>
      <span class="sr-only">Loading…</span>
    </div>
  `,
})
export class SpinnerComponent {}
