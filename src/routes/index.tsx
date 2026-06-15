import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/dashboard/TopBar";
import { WebcamPanel } from "@/components/dashboard/WebcamPanel";
import { JournalPanel } from "@/components/dashboard/JournalPanel";
import { SummaryPanel } from "@/components/dashboard/SummaryPanel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mindwell — Mental Wellness Dashboard" },
      { name: "description", content: "Track your emotional state in real time with live emotion detection, sentiment journaling, and a daily mood timeline." },
      { property: "og:title", content: "Mindwell — Mental Wellness Dashboard" },
      { property: "og:description", content: "Real-time emotion detection, sentiment journaling, and your mood timeline in one calm space." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <TopBar />
        <div className="grid gap-6 lg:grid-cols-12">
          <section className="rounded-3xl bg-card/60 p-5 backdrop-blur-sm ring-1 ring-border shadow-soft lg:col-span-3">
            <WebcamPanel />
          </section>
          <section className="rounded-3xl bg-card/60 p-5 backdrop-blur-sm ring-1 ring-border shadow-soft lg:col-span-5">
            <JournalPanel />
          </section>
          <section className="rounded-3xl bg-card/60 p-5 backdrop-blur-sm ring-1 ring-border shadow-soft lg:col-span-4">
            <SummaryPanel />
          </section>
        </div>
      </div>
    </div>
  );
}
