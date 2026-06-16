import { Brain, Bell, Settings, History } from "lucide-react";
import { HISTORY_EVENT } from "./HistoryDrawer";

const SETTINGS_EVENT = "mindmirror:open-settings";

export function TopNav() {
  const openHistory = () => window.dispatchEvent(new Event(HISTORY_EVENT));

  return (
    <header className="flex items-center justify-between gap-4 rounded-xl bg-surface px-4 py-3 ring-1 ring-border">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Brain className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-base font-bold tracking-tight">MindMirror AI</h1>
          <p className="truncate text-[11px] text-muted-foreground">Your multimodal mental wellness companion</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button className="relative grid h-10 w-10 place-items-center rounded-lg bg-background ring-1 ring-border transition hover:bg-surface-2">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-sos ring-2 ring-surface" />
        </button>
        <button
          onClick={openHistory}
          aria-label="Session history"
          className="grid h-10 w-10 place-items-center rounded-lg bg-background ring-1 ring-border transition hover:bg-surface-2"
        >
          <History className="h-4 w-4" />
        </button>
        <button
          onClick={() => window.dispatchEvent(new Event(SETTINGS_EVENT))}
          className="grid h-10 w-10 place-items-center rounded-lg bg-background ring-1 ring-border transition hover:bg-surface-2"
        >
          <Settings className="h-4 w-4" />
        </button>
        <button className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
          JJ
        </button>
      </div>
    </header>
  );
}
