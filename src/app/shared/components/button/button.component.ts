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
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  readonly sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
  };

  readonly variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md focus-visible:ring-primary-500',
    secondary:
      'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:ring-gray-400 focus-visible:ring-primary-500',
    danger: 'bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md focus-visible:ring-red-500',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus-visible:ring-primary-500',
  };
}
