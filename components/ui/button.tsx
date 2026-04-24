import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const variantClass: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-navy',
  secondary: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  ghost: 'text-ink hover:bg-paper-alt',
};

const sizeClass: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-6 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium no-underline transition-colors',
        variantClass[variant],
        sizeClass[size],
        className
      )}
      {...rest}
    />
  );
}

export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  external = false,
}: CommonProps & { href: string; external?: boolean }) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-md font-medium no-underline transition-colors',
    variantClass[variant],
    sizeClass[size],
    className
  );

  if (external) {
    return (
      <a href={href} className={classes} rel="noopener">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
