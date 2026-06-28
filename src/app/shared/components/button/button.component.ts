import { Component, Input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="baseClasses + ' ' + sizeClasses[size] + ' ' + variantClasses[variant] + (fullWidth ? ' w-full' : '')"
    >
      @if (loading) {
        <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
      }
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;

  readonly baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950';

  readonly sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
  };

  readonly variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-brand-gradient text-white shadow-glow-sm hover:shadow-glow hover:brightness-110',
    secondary:
      'bg-white/5 text-ink-100 ring-1 ring-inset ring-white/10 hover:bg-white/10 hover:ring-white/20',
    danger: 'bg-rose-600 text-white shadow-sm hover:bg-rose-500 hover:shadow-md',
    ghost: 'bg-transparent text-ink-300 hover:bg-white/5 hover:text-ink-50',
  };
}
