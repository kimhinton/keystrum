import Link from "next/link";

export const metadata = {
  title: "Privacy — keystrum",
  description:
    "keystrum makes no network requests after page load, collects no data, uses no analytics, ships no third-party SDKs.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "2026-04-17";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-neutral-100 font-sans">
      <nav className="flex items-center justify-between border-b border-white/5 bg-[#0b0b0f]/80 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="inline-flex size-5 items-center justify-center rounded-md bg-[#ff6b35] text-[10px] font-black text-black">K</span>
          keystrum
        </Link>
        <Link href="/" className="text-xs text-neutral-400 transition hover:text-white">
          ← Back
        </Link>
      </nav>

      <main className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b35]">Privacy policy</span>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            We collect nothing.
          </h1>
          <p className="mt-2 text-xs text-neutral-500">
            Last updated {LAST_UPDATED}
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-neutral-300">
          <Section title="Data we collect">
            <p>
              None. keystrum does not collect, store, transmit, or share any personal data.
              There is no account system, no sign-up, no email capture, no form submission.
            </p>
          </Section>

          <Section title="Analytics and tracking">
            <p>
              There are no analytics SDKs, no tracking pixels, no fingerprinting scripts, and
              no advertising identifiers. We do not know when you visit, how long you stay,
              what chords you play, or what device you use.
            </p>
          </Section>

          <Section title="Third parties">
            <p>
              keystrum does not integrate any third-party service in the runtime bundle.
              Fonts are served self-hosted via Next.js font optimization. No CDN logs you,
              no embed has a tracker.
            </p>
          </Section>

          <Section title="Network requests">
            <p>
              After the page loads, keystrum makes zero network requests. Audio is synthesized
              live in your browser via Karplus-Strong physical modeling. No samples are
              downloaded. No remote servers are contacted while you play.
            </p>
          </Section>

          <Section title="Local storage">
            <p>
              keystrum uses your browser&apos;s <span className="font-mono text-white">localStorage</span> to remember:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-neutral-400">
              <li>Your highest score per practice song (to show personal bests)</li>
              <li>Whether you dismissed the mobile-install modal (so we don&apos;t re-show it)</li>
              <li>Volume preference on the instrument page</li>
            </ul>
            <p className="mt-2 text-neutral-400">
              This data never leaves your device. Clearing your browser&apos;s site data removes it completely.
            </p>
          </Section>

          <Section title="Audio recordings">
            <p>
              When you press <span className="font-mono text-white">REC</span>, audio is captured via the
              browser&apos;s native MediaRecorder into a temporary Blob in memory.
              You can download the file or share it via your OS share sheet. Recordings are
              not uploaded anywhere, not transmitted, and are discarded the moment you refresh
              or close the page.
            </p>
          </Section>

          <Section title="Children">
            <p>
              keystrum is safe for all ages (rated 4+ on the App Store, Everyone on Google Play).
              Since we collect no data at all, we collect no data from children.
            </p>
          </Section>

          <Section title="Open source">
            <p>
              The full source code of keystrum is MIT-licensed and public. You can inspect
              every line responsible for handling your input at{" "}
              <a href="https://github.com/kimhinton/keystrum" className="text-[#ff6b35] underline" target="_blank" rel="noopener noreferrer">
                github.com/kimhinton/keystrum
              </a>.
              If anything in this policy seems at odds with the code, the code is the ground truth — please{" "}
              <a href="https://github.com/kimhinton/keystrum/issues" className="text-[#ff6b35] underline" target="_blank" rel="noopener noreferrer">
                open an issue
              </a>.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              If this policy changes, the update will land as a commit in the GitHub repo with a
              dated entry above, and the &quot;Last updated&quot; date at the top of this page will change.
              There is no email list to notify you — the commit history is the notification.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              For privacy questions, open an issue at{" "}
              <a href="https://github.com/kimhinton/keystrum/issues" className="text-[#ff6b35] underline" target="_blank" rel="noopener noreferrer">
                github.com/kimhinton/keystrum/issues
              </a>.
            </p>
          </Section>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-xs text-neutral-500">
          keystrum · © 2026 · MIT licensed · No data · No tracking · No accounts.
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-base font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}
