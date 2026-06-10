import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        gradient: 'btn-gradient text-white',
        primary:
          'bg-primary text-dark hover:bg-primary/90 shadow-[0_0_20px_rgba(6,214,246,0.15)]',
        secondary:
          'bg-secondary text-white hover:bg-secondary/90 shadow-[0_0_20px_rgba(109,40,255,0.15)]',
        outline:
          'border border-white/30 bg-transparent text-white hover:border-white/50 hover:bg-white/5',
        outlineDark:
          'border border-light-border bg-transparent text-light-heading hover:border-accent-blue/40 hover:bg-accent-blue/5',
        ghost: 'text-muted hover:text-white hover:bg-white/5',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-sm',
        lg: 'h-12 px-7 text-sm sm:px-8 sm:text-base',
      },
    },
    defaultVariants: {
      variant: 'gradient',
      size: 'md',
    },
  },
);

const Button = forwardRef(({ className, variant, size, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(buttonVariants({ variant, size, className }))}
    {...props}
  />
));
Button.displayName = 'Button';

export { Button, buttonVariants };
