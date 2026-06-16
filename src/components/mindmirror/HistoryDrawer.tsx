import { useEffect, useState } from "react";
import { X, Clock } from "lucide-react";
import { useSessions } from "@/hooks/use-sessions";

export const HISTORY_EVENT = "mindmirror:open-history";

export function HistoryDrawer() {
  const [open, setOpen] = useState(false);
  const { sessions } = useSessions();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(HISTORY_EVENT, handler);
    return () => window.removeEventListener(HISTORY_EVENT, handler);
  }, []);

  const ordered = [...sessions].reverse();

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[90] bg-background/80 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-[95] h-full w-80 max-w-[90vw] bg-surface ring-1 ring-border transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="text-base font-bold tracking-tight">Session History</h3>
            <button
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-lg bg-background ring-1 ring-border transition hover:bg-surface-2"
              aria-label="Close history"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {ordered.length === 0 ? (
              <p className="mt-10 text-center text-sm text-muted-foreground">
                No sessions yet. Save your first journal entry.
              </p>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {ordered.map((s) => {
                  const dot = s.riskScore > 7 ? "🔴" : s.riskScore >= 4 ? "🟡" : "🟢";
                  const tone =
                    s.riskScore > 7
                      ? "bg-destructive/20 text-destructive ring-destructive/40"
                      : s.riskScore >= 4
                        ? "bg-warning/20 text-warning ring-warning/40"
                        : "bg-positive/20 text-positive ring-positive/40";
                  const date = new Date(s.timestamp).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  });
                  const preview = s.entry.length > 60 ? s.entry.slice(0, 60) + "…" : s.entry;
                  return (
                    <li
                      key={s.timestamp}
                      className="rounded-lg bg-background p-3.5 ring-1 ring-border"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {date}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${tone}`}
                        >
                          {dot} {s.riskScore}/10
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-snug">{preview}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
