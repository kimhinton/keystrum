import LibraryScreen from "@/components/library/LibraryScreen";
import WebRedirect from "@/components/native/WebRedirect";

export const metadata = {
  title: "Library — keystrum",
  description: "Your saved recordings. Native app only.",
  alternates: { canonical: "/instrument" },
};

export default function LibraryPage() {
  return (
    <>
      <WebRedirect to="/" />
      <LibraryScreen />
    </>
  );
}
