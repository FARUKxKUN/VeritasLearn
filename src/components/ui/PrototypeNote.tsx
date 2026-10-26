import { cn } from '../../lib/utils';

export function PrototypeNote({ className }: { className?: string }) {
  return <p className={cn('label', className)}>Prototype. Mock data and a scripted tutor, no real users or accounts.</p>;
}
