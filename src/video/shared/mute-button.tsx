/** @jsxImportSource react */

import { MuteButton as MuteButtonPrimitive } from '@videojs/react';
import type { ClassValue } from 'cn';

import { cn, resolveClassName } from '@/lib/resolve-class-name';

import { Button } from './button';

function SpeakerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.394 8.205a1 1 0 0 1 1.401.188A5.93 5.93 0 0 1 21 12a5.93 5.93 0 0 1-1.205 3.607 1 1 0 1 1-1.59-1.213A3.93 3.93 0 0 0 19 12c0-.915-.301-1.746-.795-2.393a1 1 0 0 1 .189-1.402"
      />
      <path d="M12.992 3.976c.686-.528 1.504-.956 2.375-.588.863.365 1.14 1.245 1.26 2.11.123.887.123 2.108.123 3.626v5.755c0 1.519 0 2.74-.123 3.626-.12.865-.397 1.745-1.26 2.11-.871.369-1.689-.06-2.375-.587-.703-.54-1.595-1.451-2.645-2.524-.54-.55-.898-.817-1.26-.967-.365-.15-.808-.214-1.58-.214-.67 0-1.267 0-1.72-.047-.475-.05-.916-.157-1.313-.427-.756-.516-1.045-1.271-1.154-1.965-.082-.518-.073-1.086-.065-1.543v-.678c-.008-.458-.017-1.026.065-1.544.11-.694.398-1.449 1.154-1.964.397-.271.838-.378 1.313-.428.453-.047 1.05-.047 1.72-.047.772 0 1.215-.064 1.58-.214.362-.15.72-.416 1.26-.967 1.05-1.072 1.942-1.984 2.645-2.523" />
    </svg>
  );
}

function SpeakerMutedIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.992 3.976c.686-.528 1.504-.956 2.375-.588.863.365 1.14 1.245 1.26 2.11.123.887.123 2.108.123 3.626v5.755c0 1.519 0 2.74-.123 3.626-.12.865-.397 1.745-1.26 2.11-.871.369-1.689-.06-2.375-.587-.703-.54-1.595-1.451-2.645-2.524-.54-.55-.898-.817-1.26-.967-.365-.15-.808-.214-1.58-.214-.67 0-1.267 0-1.72-.047-.475-.05-.916-.157-1.313-.427-.756-.516-1.045-1.271-1.154-1.965-.082-.518-.073-1.086-.065-1.543v-.678c-.008-.458-.017-1.026.065-1.544.11-.694.398-1.449 1.154-1.964.397-.271.838-.378 1.313-.428.453-.047 1.05-.047 1.72-.047.772 0 1.215-.064 1.58-.214.362-.15.72-.416 1.26-.967 1.05-1.072 1.942-1.984 2.645-2.523" />
      <line x1="18" y1="9.5" x2="22.5" y2="14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="22.5" y1="9.5" x2="18" y2="14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MuteButton({ className, ...props }: MuteButtonPrimitive.Props = {}) {
  return (
    <MuteButtonPrimitive
      render={<Button />}
      className={(state) => cn('group/mute', resolveClassName(className, state))}
      {...props}
    >
      <SpeakerMutedIcon
        className={cn('col-start-1 row-start-1 size-[17.8px] text-white relative -left-[1px]', 'hidden group-data-muted/mute:block')}
      />
      <SpeakerIcon
        className={cn('col-start-1 row-start-1 size-[17.8px] text-white relative -left-[1px]', 'hidden group-not-data-muted/mute:block')}
      />
    </MuteButtonPrimitive>
  );
}
