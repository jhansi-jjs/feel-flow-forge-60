import { createFileRoute } from "@tanstack/react-router";
import { TopNav } from "@/components/mindmirror/TopNav";
import { LeftPanel } from "@/components/mindmirror/LeftPanel";
import { CenterPanel } from "@/components/mindmirror/CenterPanel";
import { RightPanel } from "@/components/mindmirror/RightPanel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MindMirror AI — Multimodal Mental Health Companion" },
      { name: "description", content: "Real-time emotion detection, sentiment journaling, and your mood timeline." },
      { property: "og:title", content: "MindMirror AI — Multimodal Mental Health Companion" },
      { property: "og:description", content: "Live emotion detection, journaling, and mood tracking with an empathetic AI companion." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Dashboard,
});

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl bg-surface p-4 ring-1 ring-border ${className}`}>
      {children}
    </section>
  );
}

function Dashboard() {
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5">
        <TopNav />
        <div className="grid gap-5 lg:grid-cols-[1fr_1.8fr_1.2fr]">
          <Panel><LeftPanel /></Panel>
          <Panel><CenterPanel /></Panel>
          <Panel><RightPanel /></Panel>
        </div>
      </div>
    </div>
  );
}
