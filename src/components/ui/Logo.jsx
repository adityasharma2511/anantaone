import { cn } from '@/lib/utils';
import anantaIcon from '@/assets/logos/ananta-one.png';
import headerLogo from '@/assets/logos/header-logo.png';
import { BRAND } from '@/constants/theme';

const textSizes = {
  sm: { title: 'text-sm', tagline: 'text-[10px]' },
  md: { title: 'text-base', tagline: 'text-[11px]' },
  lg: { title: 'text-lg', tagline: 'text-xs' },
  xl: { title: 'text-xl', tagline: 'text-sm' },
};

const iconSizes = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-14 w-14',
  xl: 'h-[3.25rem] w-[3.25rem]',
};

function LogoWordmark({ size = 'sm', light = false, showTagline = true }) {
  const sizes = textSizes[size];

  return (
    <div className="flex flex-col justify-center">
      <span
        className={cn(
          'font-heading font-bold uppercase leading-none tracking-[0.12em]',
          sizes.title,
          light ? 'text-light-heading' : 'text-white',
        )}
      >
        Ananta One
      </span>
      {showTagline && (
        <span
          className={cn(
            'font-tagline mt-1 leading-tight',
            sizes.tagline,
            light ? 'text-light-muted' : 'text-white/65',
          )}
        >
          {BRAND.tagline}
        </span>
      )}
    </div>
  );
}

function LogoIcon({ size = 'sm', className }) {
  return (
    <img
      src={anantaIcon}
      alt=""
      aria-hidden="true"
      className={cn(iconSizes[size], 'shrink-0 object-contain', className)}
    />
  );
}

/** Icon + white wordmark — mobile header, desktop header & footer */
function LogoIconText({
  size = 'sm',
  light = false,
  showTagline = true,
  className,
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <LogoIcon size={size} />
      <LogoWordmark size={size} light={light} showTagline={showTagline} />
    </div>
  );
}

/** Larger icon + wordmark — desktop header (no white background) */
function LogoHeaderDesktop() {
  return <LogoIconText size="xl" showTagline className="gap-3" />;
}

/** Full logo for light backgrounds (footer alternative / future use) */
function LogoFullDark({ size = 'md' }) {
  const height = size === 'lg' ? 'h-14' : size === 'md' ? 'h-11' : 'h-9';
  return (
    <img
      src={headerLogo}
      alt={BRAND.name}
      className={cn(height, 'w-auto max-w-[220px] object-contain object-left')}
    />
  );
}

export function Logo({
  className,
  variant = 'default',
  showText = true,
  size = 'md',
  light = false,
}) {
  if (variant === 'header') {
    return (
      <div className={cn('inline-flex items-center', className)}>
        {/* Mobile & tablet: icon + white wordmark */}
        <div className="lg:hidden">
          <LogoIconText size="sm" showTagline />
        </div>
        {/* Desktop: larger icon + wordmark, no white background */}
        <div className="hidden lg:block">
          <LogoHeaderDesktop />
        </div>
      </div>
    );
  }

  if (!showText) {
    return (
      <div className={cn('inline-flex', className)}>
        <LogoIcon size={size} />
      </div>
    );
  }

  return (
    <div className={cn('inline-flex items-center', className)}>
      <LogoIconText size={size} light={light} />
    </div>
  );
}

export { LogoFullDark };
