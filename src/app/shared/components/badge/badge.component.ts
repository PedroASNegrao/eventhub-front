import { Component, Input } from '@angular/core';

export type BadgeVariant = 'primary' | 'neutral' | 'success';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `<span [class]="base + ' ' + variants[variant]"><ng-content></ng-content></span>`,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'neutral';

  readonly base = 'inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium';

  readonly variants: Record<BadgeVariant, string> = {
    primary: 'bg-primary-50 text-primary-700',
    neutral: 'bg-gray-100 text-gray-600',
    success: 'bg-emerald-50 text-emerald-700',
  };
}
