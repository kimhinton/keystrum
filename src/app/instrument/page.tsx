import Link from "next/link";
import KeyboardGuitar from "@/components/keyboard-guitar/KeyboardGuitar";
import RecordBar from "@/components/instrument/RecordBar";

export const metadata = {
  title: "Play — keystrum",
  description:
    "Play keystrum — a strum-based keyboard instrument. Four rows, six chords, one keyboard. No install needed.",
  robots: { index: false, follow: false },
};

export default function InstrumentPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#0b0b0f] p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-6 flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-neutral-100"
          >
            <span className="inline-flex size-5 items-center justify-center rounded-md bg-[#ff6b35] text-[10px] font-black text-black">
              K
            </span>
            keystrum
          </Link>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 shadow-[0_20px_80px_-30px_rgba(255,107,53,0.35)]">
          <KeyboardGuitar theme="dark" />
        </div>
        <div className="mt-4">
          <RecordBar />
        </div>
      </div>
    </div>
  );
}
