import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SheetProps {
  open: boolean;
  /** Called when the user dismisses the sheet (Escape or backdrop). Omit to make it non-dismissable. */
  onClose?: () => void;
  label: string;
  children: ReactNode;
  className?: string;
}

/** Native modal dialog: focus trap, Escape and inert background come from the platform. */
export function Sheet({ open, onClose, label, children, className }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={cn(
        'sheet m-auto w-[min(42rem,calc(100%-1.5rem))] max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-edge border-2 border-ink bg-surface p-0 text-ink max-md:mb-3',
        className,
      )}
      onCancel={(event) => {
        event.preventDefault();
        onClose?.();
      }}
      onClose={() => {
        // A second Escape can close a native dialog despite preventDefault. Reopen it while the state says open.
        const dialog = ref.current;
        if (open && dialog && !dialog.open) dialog.showModal();
      }}
      onMouseDown={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const outside =
          event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
        if (outside) onClose?.();
      }}
    >
      {open ? <div className="p-6 md:p-9">{children}</div> : null}
    </dialog>
  );
}
