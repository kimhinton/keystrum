import InstrumentApp from "@/components/instrument/InstrumentApp";
import RecallSession from "@/components/recall/RecallSession";

export const metadata = {
  title: "Virtual Guitar — Record, Metronome, QWERTY",
  description:
    "Full keystrum instrument. Strum guitar chords with metronome, volume, recording. Browser-based virtual guitar, no install, no account.",
  keywords: [
    "virtual guitar online free",
    "virtual guitar no download",
    "browser guitar recording",
    "metronome chord practice",
    "play guitar online browser",
    "online guitar free",
  ],
  alternates: { canonical: "/instrument" },
};

export default function InstrumentPage() {
  return (
    <>
      <h1 className="sr-only">
        Virtual Guitar Online — Full Instrument with Recording, Metronome, and QWERTY Keyboard Strumming
      </h1>
      <InstrumentApp />
      <RecallSession />
    </>
  );
}
