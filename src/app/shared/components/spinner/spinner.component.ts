import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    <div class="flex items-center justify-center py-12">
      <span class="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary-600"></span>
    </div>
  `,
})
export class SpinnerComponent {}
