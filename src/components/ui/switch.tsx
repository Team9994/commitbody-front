'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    {...props}
    className={cn(
      'peer p-1 inline-flex h-8 w-14 items-center rounded-16 transition-colors duration-300 ease-in-out cursor-pointer',
      // 비활성화와 활성화 배경 색상
      'bg-[#555555] data-[state=checked]:bg-[#198DF7]',
      className
    )}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'block p-1 h-6 w-6 shadow-md rounded-16 transition-transform duration-300 ease-in-out',
        // 비활성화와 활성화 Thumb 색상 및 위치
        'bg-[#999999] data-[state=checked]:bg-[#FFFFFF]',
        'translate-x-0 data-[state=checked]:translate-x-6'
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
