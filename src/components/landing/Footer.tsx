import { Mascot } from '../ui/Mascot';
import { Reveal } from '../ui/Reveal';
import { ButtonLink } from '../ui/Button';
import { PrototypeNote } from '../ui/PrototypeNote';

const REPO = 'https://github.com/FARUKxKUN/VeritasLearn';

export function Footer() {
  return (
    <footer className="shell py-28">
      <Reveal className="pop flex flex-col items-start gap-8 bg-sun p-8 md:flex-row md:items-center md:justify-between md:p-12">
        <div>
          <h2 className="max-w-xl text-h1">Ready to earn your first answer?</h2>
          <div className="mt-8">
            <ButtonLink to="/learn" variant="crimson" className="min-h-14 px-8 text-lg">
              Start playing
            </ButtonLink>
          </div>
        </div>
        <Mascot mood="happy" size={170} className="float" />
      </Reveal>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div>
          <p className="label">Credits</p>
          <ul className="mt-3 space-y-1">
            <li>
              Concept and pitch:{' '}
              <a className="font-bold underline underline-offset-4" href="https://github.com/yassinebouteraa">
                Yassine Bouteraa
              </a>{' '}
              and{' '}
              <a className="font-bold underline underline-offset-4" href="https://github.com/rayenchatti">
                Rayen Chatti
              </a>
            </li>
            <li>Prototype: Farouk Battikh</li>
            <li>1st place, IEEE OPSYNC hackathon, February 2026</li>
          </ul>
        </div>
        <div>
          <PrototypeNote />
          <p className="mt-3 text-ink-2">
            The hackathon version is kept in the{' '}
            <a className="font-bold underline underline-offset-4" href={`${REPO}/tree/hackathon-2026-02`}>
              hackathon-2026-02
            </a>{' '}
            tag.
          </p>
        </div>
      </div>
    </footer>
  );
}
