import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Users } from "lucide-react";

export const Route = createFileRoute("/caregiver")({
  head: () => ({
    meta: [
      { title: "Caregiver Dashboard — MindMirror AI" },
      { name: "description", content: "Monitor wellbeing across the people in your care." },
      { property: "og:title", content: "Caregiver Dashboard — MindMirror AI" },
      { property: "og:description", content: "Monitor wellbeing across the people in your care." },
    ],
  }),
  component: CaregiverPage,
});

type Row = {
  user: string;
  lastSession: string;
  mood: string;
  risk: { dot: string; label: string };
  status: string;
  highlight?: boolean;
};

const ROWS: Row[] = [
  { user: "Priya S", lastSession: "Today 2:30 PM", mood: "3/10", risk: { dot: "🟢", label: "Low" }, status: "Stable" },
  { user: "Arjun M", lastSession: "Yesterday", mood: "7/10", risk: { dot: "🔴", label: "High" }, status: "Needs Attention", highlight: true },
  { user: "Meena R", lastSession: "2 days ago", mood: "5/10", risk: { dot: "🟡", label: "Medium" }, status: "Monitoring" },
];

function CaregiverPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-surface-2 px-3.5 py-2 text-sm font-semibold ring-1 ring-border transition hover:bg-surface-2/70"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <span className="text-[11px] text-muted-foreground">MindMirror AI</span>
        </div>

        <header className="flex items-center gap-4 rounded-3xl bg-surface/60 p-6 ring-1 ring-border shadow-soft backdrop-blur-md">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.45_0.22_300)] shadow-glow">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold tracking-tight">Caregiver Dashboard</h1>
            <p className="text-sm text-muted-foreground">3 people in your care</p>
          </div>
        </header>

        <div className="overflow-hidden rounded-3xl bg-surface/60 ring-1 ring-border shadow-soft backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-2/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-semibold">User</th>
                  <th className="px-5 py-3 font-semibold">Last Session</th>
                  <th className="px-5 py-3 font-semibold">Mood Score</th>
                  <th className="px-5 py-3 font-semibold">Risk Level</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr
                    key={r.user}
                    className={`border-b border-border last:border-0 transition ${
                      r.highlight
                        ? "bg-[color-mix(in_oklab,var(--color-sos)_18%,transparent)] hover:bg-[color-mix(in_oklab,var(--color-sos)_22%,transparent)]"
                        : "hover:bg-surface-2/40"
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/20 text-xs font-bold text-primary">
                          {r.user.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="font-semibold">{r.user}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{r.lastSession}</td>
                    <td className="px-5 py-4 font-semibold">{r.mood}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2/60 px-2.5 py-1 text-xs font-medium ring-1 ring-border">
                        <span>{r.risk.dot}</span>
                        {r.risk.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
