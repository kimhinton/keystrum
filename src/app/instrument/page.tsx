import InstrumentApp from "@/components/instrument/InstrumentApp";

export const metadata = {
  title: "Virtual guitar online — record, metronome, volume",
  description:
    "Full keystrum instrument — strum guitar chords on your QWERTY keyboard with metronome, volume control, and recording. Virtual guitar online, free, no download. Save sessions, share via URL.",
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
  return <InstrumentApp />;
}
