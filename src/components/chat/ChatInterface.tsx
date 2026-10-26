import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUp, LockKey, LockKeyOpen } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT_SOFT } from '../../lib/motion';
import { useApp } from '../../contexts/AppContext';
import { getFallbackResponse } from '../../utils/mockData';
import type { Message } from '../../types';
import { Button } from '../ui/Button';
import { RedactedAnswer } from './RedactedAnswer';

const SUGGESTIONS = ['How does photosynthesis work?', "Explain Newton's first law", 'What is entropy?'] as const;
const THINK_MS = 700;

interface ChatInterfaceProps {
  onOpenGate: (messageId: string) => void;
}

export function ChatInterface({ onOpenGate }: ChatInterfaceProps) {
  const { messages, addMessage } = useApp();
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [messages.length, thinking]);

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || thinking) return;
    const now = Date.now();
    addMessage({ id: `u-${now}`, role: 'user', content: trimmed, locked: false, timestamp: new Date() });
    setDraft('');
    setThinking(true);
    timer.current = window.setTimeout(() => {
      const study = getFallbackResponse(trimmed);
      addMessage({
        id: `a-${now}`,
        role: 'assistant',
        content: study.answer,
        humanizedContent: study.humanized,
        locked: true,
        timestamp: new Date(),
      });
      setThinking(false);
    }, THINK_MS);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    ask(draft);
  };

  return (
    <div className="flex min-h-[calc(100dvh-9rem)] flex-col">
      <div className="flex-1 space-y-10 pb-10" aria-live="polite">
        {messages.length === 0 ? <EmptyState onPick={ask} /> : null}
        {messages.map((message) => (
          <Bubble key={message.id} message={message} onOpenGate={onOpenGate} />
        ))}
        {thinking ? <p className="label">The tutor is writing...</p> : null}
        <div ref={endRef} />
      </div>

      <form onSubmit={submit} className="sticky bottom-0 -mx-1 flex gap-2 border-t-2 border-ink bg-paper px-1 pb-4 pt-4">
        <label htmlFor="ask" className="sr-only">
          Ask the tutor a question
        </label>
        <input
          id="ask"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask about anything you are studying"
          autoComplete="off"
          className="min-h-12 flex-1 rounded-edge border-2 border-ink bg-surface px-4 text-ink placeholder:text-ink-3"
        />
        <Button type="submit" variant="crimson" disabled={!draft.trim() || thinking} aria-label="Send question" className="size-12 px-0">
          <ArrowUp size={22} weight="bold" aria-hidden />
        </Button>
      </form>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (question: string) => void }) {
  return (
    <section className="pt-6 md:pt-14">
      <p className="label">Ask first, read second</p>
      <h1 className="mt-3 max-w-3xl text-h1">Every answer starts blacked out.</h1>
      <p className="mt-5 max-w-xl text-ink-2">
        Ask a question. The tutor writes the answer, then hides it. Pass a short check and the bars lift. This prototype
        has scripted answers for photosynthesis and Newton&apos;s first law, and one general reply for everything else.
      </p>
      <ul className="mt-8 flex flex-wrap gap-3">
        {SUGGESTIONS.map((suggestion) => (
          <li key={suggestion}>
            <Button variant="outline" onClick={() => onPick(suggestion)}>
              {suggestion}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Bubble({ message, onOpenGate }: { message: Message; onOpenGate: (id: string) => void }) {
  const reduce = useReducedMotion();
  const enter = {
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE_OUT_SOFT },
  } as const;
  if (message.role === 'user') {
    return (
      <motion.div className="flex justify-end" {...enter}>
        <p className="max-w-[85%] bg-ink px-5 py-3 text-paper">{message.content}</p>
      </motion.div>
    );
  }
  return (
    <motion.article className="border-l-4 border-crimson pl-5 md:pl-8" {...enter}>
      <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="label flex items-center gap-2">
          {message.locked ? <LockKey size={16} aria-hidden /> : <LockKeyOpen size={16} aria-hidden />}
          Tutor
          {!message.locked && message.unlockedWith ? (
            <span>{message.unlockedWith === 'quiz' ? '- opened by passing the gate' : '- copied without the gate'}</span>
          ) : null}
        </p>
      </header>
      <RedactedAnswer text={message.content} locked={message.locked} />
      {message.locked ? (
        <Button variant="crimson" className="mt-5" onClick={() => onOpenGate(message.id)}>
          <LockKeyOpen size={18} aria-hidden /> Lift the bars
        </Button>
      ) : null}
    </motion.article>
  );
}
