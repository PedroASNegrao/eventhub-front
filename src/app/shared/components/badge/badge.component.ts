import { Component, Input } from '@angular/core';

export type BadgeVariant = 'primary' | 'neutral' | 'success';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `<span [class]="base + ' ' + variants[variant]">
    <span class="h-1.5 w-1.5 rounded-full" [class]="dots[variant]"></span>
    <ng-content></ng-content>
  </span>`,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'neutral';

  readonly base =
    'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset';

  readonly variants: Record<BadgeVariant, string> = {
    primary: 'bg-primary-500/10 text-primary-200 ring-primary-500/25',
    neutral: 'bg-white/5 text-ink-300 ring-white/10',
    success: 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/25',
  };

  readonly dots: Record<BadgeVariant, string> = {
    primary: 'bg-primary-400 shadow-[0_0_8px] shadow-primary-400/70',
    neutral: 'bg-ink-400',
    success: 'bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/70',
  };
}
