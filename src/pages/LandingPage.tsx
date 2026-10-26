import { Link } from 'react-router-dom';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Paths } from '../components/landing/Paths';
import { TierLadder } from '../components/landing/TierLadder';
import { Footer } from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div>
      <header className="shell flex min-h-20 flex-wrap items-center justify-between gap-y-1 py-2">
        <Link to="/" className="flex min-h-11 items-center gap-2 font-display text-2xl leading-none">
          <img src="/logo.svg" alt="" width={40} height={40} />
          <span>
            Veritas<span className="text-crimson">Learn</span>
          </span>
        </Link>
        <nav aria-label="Main" className="flex gap-2 font-extrabold">
          <Link className="inline-flex min-h-11 items-center rounded-full px-3 hover:bg-sunk" to="/dashboard">
            Progress
          </Link>
          <Link className="inline-flex min-h-11 items-center rounded-full px-3 hover:bg-sunk" to="/leaderboard">
            Ranks
          </Link>
        </nav>
      </header>
      <main id="main" className="page-in">
        <Hero />
        <HowItWorks />
        <Paths />
        <TierLadder />
      </main>
      <Footer />
    </div>
  );
}
