import { Reveal } from '../ui/Reveal';
import { ButtonLink } from '../ui/Button';
import { PrototypeNote } from '../ui/PrototypeNote';

const REPO = 'https://github.com/FARUKxKUN/VeritasLearn';

export function Footer() {
  return (
    <footer className="shell py-28">
      <Reveal>
        <h2 className="max-w-3xl text-h1">Try one question. Watch the bars lift.</h2>
      </Reveal>
      <div className="mt-8">
        <ButtonLink to="/learn" variant="crimson">
          Open the tutor
        </ButtonLink>
      </div>

      <div className="mt-16 grid gap-8 border-t-2 border-ink pt-8 md:grid-cols-2">
        <div>
          <p className="label">Credits</p>
          <ul className="mt-3 space-y-1 text-small">
            <li>
              Concept and pitch:{' '}
              <a className="underline underline-offset-4" href="https://github.com/yassinebouteraa">
                Yassine Bouteraa
              </a>{' '}
              and{' '}
              <a className="underline underline-offset-4" href="https://github.com/rayenchatti">
                Rayen Chatti
              </a>
            </li>
            <li>Prototype: Farouk Battikh</li>
            <li>1st place, IEEE OPSYNC hackathon, February 2026</li>
          </ul>
        </div>
        <div>
          <PrototypeNote />
          <p className="mt-3 text-small text-ink-2">
            The hackathon version is kept in the{' '}
            <a className="underline underline-offset-4" href={`${REPO}/tree/hackathon-2026-02`}>
              hackathon-2026-02
            </a>{' '}
            tag.
          </p>
        </div>
      </div>
    </footer>
  );
}
