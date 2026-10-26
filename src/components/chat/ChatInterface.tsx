import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUp, LockKeyOpen } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import { useApp } from '../../contexts/AppContext';
import { getFallbackResponse } from '../../utils/mockData';
import { EASE_OUT_SOFT } from '../../lib/motion';
import type { Message } from '../../types';
import { Button } from '../ui/Button';
import { Mascot } from '../ui/Mascot';
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
    <div className="flex min-h-[calc(100dvh-11rem)] flex-col">
      <div className="flex-1 space-y-10 pb-10" aria-live="polite">
        {messages.length === 0 ? <EmptyState onPick={ask} /> : null}
        {messages.map((message) => (
          <Bubble key={message.id} message={message} onOpenGate={onOpenGate} />
        ))}
        {thinking ? (
          <p className="flex items-center gap-3 font-extrabold text-ink-2">
            <Mascot mood="think" size={48} className="float" /> The tutor is writing...
          </p>
        ) : null}
        <div ref={endRef} />
      </div>

      <form onSubmit={submit} className="sticky bottom-0 flex gap-3 bg-paper/95 pb-5 pt-4">
        <label htmlFor="ask" className="sr-only">
          Ask the tutor a question
        </label>
        <input
          id="ask"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask about anything you are studying"
          autoComplete="off"
          className="min-h-14 flex-1 rounded-full border-2 border-ink bg-surface px-6 font-bold shadow-[0_4px_0_0_var(--color-ink)] placeholder:font-semibold placeholder:text-ink-3"
        />
        <Button type="submit" variant="crimson" disabled={!draft.trim() || thinking} aria-label="Send question" className="size-14 px-0">
          <ArrowUp size={24} weight="bold" aria-hidden />
        </Button>
      </form>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (question: string) => void }) {
  return (
    <section className="flex flex-col items-start gap-6 pt-6 md:flex-row md:items-center md:gap-12 md:pt-14">
      <Mascot mood="locked" size={160} className="float" />
      <div>
        <p className="label">Level 1 - ask a question</p>
        <h1 className="mt-3 max-w-2xl text-h1">Every answer starts hidden.</h1>
        <p className="mt-4 max-w-xl text-ink-2">
          Ask something. The tutor writes the answer, then hides it behind censor bars. Beat a short quiz to lift them and
          earn XP. This prototype has scripted answers for photosynthesis and Newton&apos;s first law, and one general reply for
          everything else.
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
      </div>
    </section>
  );
}

function Bubble({ message, onOpenGate }: { message: Message; onOpenGate: (id: string) => void }) {
  const reduce = useReducedMotion();
  const enter = {
    initial: reduce ? false : { opacity: 0, y: 24, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.5, ease: EASE_OUT_SOFT },
  } as const;

  if (message.role === 'user') {
    return (
      <motion.div className="flex justify-end" {...enter}>
        <p className="max-w-[85%] rounded-3xl rounded-br-lg border-2 border-ink bg-ink px-5 py-3 font-bold text-paper shadow-[0_4px_0_0_var(--color-crimson)]">
          {message.content}
        </p>
      </motion.div>
    );
  }
  return (
    <motion.article className="flex items-start gap-4" {...enter}>
      <Mascot mood={message.locked ? 'locked' : 'happy'} size={64} className="mt-1 hidden sm:block" />
      <div className="pop min-w-0 flex-1 p-6 md:p-8">
        <p className="label mb-4 flex flex-wrap items-center gap-2">
          Tutor
          {message.locked ? <span className="rounded-full bg-sunk px-3 py-1">Locked</span> : null}
          {!message.locked && message.unlockedWith === 'quiz' ? (
            <span className="rounded-full bg-mint-tint px-3 py-1 text-mint">Unlocked by quiz</span>
          ) : null}
          {!message.locked && message.unlockedWith === 'copy' ? (
            <span className="rounded-full bg-sunk px-3 py-1">Copied, no XP</span>
          ) : null}
        </p>
        <RedactedAnswer text={message.content} locked={message.locked} />
        {message.locked ? (
          <Button variant="crimson" className="mt-6" onClick={() => onOpenGate(message.id)}>
            <LockKeyOpen size={20} weight="bold" aria-hidden /> Lift the bars
          </Button>
        ) : null}
      </div>
    </motion.article>
  );
}
