import Link from "next/link";
import { WindowCard } from "@/components/ui/window-card";
import { buttonClassNames } from "@/lib/button-styles";

export default function NotFound() {
  return (
    <main className="relative z-10 flex flex-1 items-center justify-center px-5 py-20">
      <WindowCard title="404" className="w-full max-w-lg" bodyClassName="p-8 text-center sm:p-12">
        <p className="font-sans text-h2 mb-5" aria-label="Confused">¯&#92;_(ツ)_/¯</p>
        <h1 className="font-sans text-h2">This page wandered off.</h1>
        <Link href="/" className={buttonClassNames("primary", "md", "mt-8")}>
          Back to home
        </Link>
      </WindowCard>
    </main>
  );
}
