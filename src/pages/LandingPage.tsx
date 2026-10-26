import { Link } from 'react-router-dom';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Paths } from '../components/landing/Paths';
import { TierLadder } from '../components/landing/TierLadder';
import { Footer } from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div>
      <header className="shell flex min-h-16 items-center justify-between">
        <Link to="/" className="flex min-h-11 items-center gap-2 font-display text-2xl leading-none">
          <img src="/logo.svg" alt="" width={28} height={28} />
          <span>
            Veritas<span className="text-crimson">Learn</span>
          </span>
        </Link>
        <nav aria-label="Main" className="flex gap-4 text-small font-medium">
          <Link className="inline-flex min-h-11 items-center" to="/dashboard">
            Progress
          </Link>
          <Link className="inline-flex min-h-11 items-center" to="/leaderboard">
            Leaderboard
          </Link>
        </nav>
      </header>
      <main id="main">
        <Hero />
        <HowItWorks />
        <Paths />
        <TierLadder />
      </main>
      <Footer />
    </div>
  );
}
