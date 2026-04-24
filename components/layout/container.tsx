import { cn } from '@/lib/cn';
import type { ElementType, ReactNode } from 'react';

export function Container({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={cn('mx-auto w-full max-w-container px-6 md:px-8', className)}>
      {children}
    </Tag>
  );
}
