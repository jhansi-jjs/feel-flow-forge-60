import { createFileRoute } from "@tanstack/react-router";
import { TopNav } from "@/components/mindmirror/TopNav";
import { LeftPanel } from "@/components/mindmirror/LeftPanel";
import { CenterPanel } from "@/components/mindmirror/CenterPanel";
import { RightPanel } from "@/components/mindmirror/RightPanel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MindMirror AI — Your Mental Health Companion" },
      { name: "description", content: "AI-powered mental wellness companion with live emotion detection, journaling, sentiment analysis, and mood tracking." },
      { property: "og:title", content: "MindMirror AI — Your Mental Health Companion" },
      { property: "og:description", content: "Live emotion detection, journaling, and mood tracking with an empathetic AI companion." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Dashboard,
});

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-3xl bg-surface/60 p-5 ring-1 ring-border shadow-soft backdrop-blur-md ${className}`}>
      {children}
    </section>
  );
}

function Dashboard() {
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5">
        <TopNav />
        <div className="grid gap-5 lg:grid-cols-20">
          <Panel className="lg:col-span-5"><LeftPanel /></Panel>
          <Panel className="lg:col-span-9"><CenterPanel /></Panel>
          <Panel className="lg:col-span-6"><RightPanel /></Panel>
        </div>
      </div>
    </div>
  );
}
