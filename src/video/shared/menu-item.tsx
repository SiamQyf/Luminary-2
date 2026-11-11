/** @jsxImportSource react */

import { Menu as MenuPrimitive } from '@videojs/react';
import { CheckIcon as CheckIconPrimitive } from '@videojs/react/icons/scaffold';

import { cn } from '@/lib/resolve-class-name';

export function RadioItem({ children, ...props }: MenuPrimitive.RadioItemProps) {
  return (
    <MenuPrimitive.RadioItem
      className={cn(
        'group/menu-radio flex cursor-pointer items-center justify-between gap-3 rounded-[10px] min-h-[38px] w-full shrink-0 px-2.5 py-1.5 text-[13.5px] leading-snug text-white/90 select-none',
        // Clean transparent row with subtle frosted hover highlight strictly on hover or keyboard focus-visible
        'bg-transparent border-0',
        'hover:bg-white/[0.08] data-focus-visible:bg-white/[0.08]',
        'group-aria-checked/menu-radio:bg-white/[0.06] group-aria-checked/menu-radio:font-medium group-aria-checked/menu-radio:text-white',
        'active:bg-white/[0.14]',
        'transition-colors duration-150 ease-out outline-none',
        'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white',
        'data-custom:italic'
      )}
      {...props}
    >
      {children}
      <MenuPrimitive.ItemIndicator
        forceMount
        className={'ms-auto -me-0.5 shrink-0 opacity-0 group-aria-checked/menu-radio:opacity-100'}
      >
        <CheckIconPrimitive className={'size-[15px] shrink-0 text-white'} />
      </MenuPrimitive.ItemIndicator>
    </MenuPrimitive.RadioItem>
  );
}
