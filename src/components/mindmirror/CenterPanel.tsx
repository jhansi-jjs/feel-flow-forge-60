import { useState } from "react";
import { Sparkles, Mic, Save, Calendar, Lightbulb } from "lucide-react";

const TIPS = [
  "Try the 5-4-3-2-1 grounding: name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.",
  "Reframe: what would you tell a friend who said this to themselves?",
  "Box breathing — inhale 4, hold 4, exhale 4, hold 4. Repeat for one minute.",
  "Notice the thought, label it ('worry', 'judgment'), and let it pass like a cloud.",
];

export function CenterPanel() {
  const [text, setText] = useState("");
  const [tip, setTip] = useState<string | null>(null);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const analyze = () => {
    setTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
  };

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-2xl font-bold tracking-tight">Today's Journal</h2>
          <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {today}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold text-primary ring-1 ring-primary/30">
          Private
        </span>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="How are you feeling right now? Write freely..."
        className="min-h-[280px] flex-1 resize-none rounded-2xl bg-surface-2/40 p-5 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/70 ring-1 ring-border outline-none transition focus:ring-2 focus:ring-primary/50"
      />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button
          onClick={analyze}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
        >
          <Sparkles className="h-4 w-4" />
          Analyse Now
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-surface-2 px-4 py-2.5 text-sm font-semibold ring-1 ring-border transition hover:bg-surface-2/70">
          <Mic className="h-4 w-4" />
          Voice Input 🎙
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-surface-2 px-4 py-2.5 text-sm font-semibold ring-1 ring-border transition hover:bg-surface-2/70">
          <Save className="h-4 w-4" />
          Save Entry
        </button>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-5 ring-1 ring-primary/30">
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/20 text-primary">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              CBT Tip
            </p>
            <p className="mt-1 text-sm leading-relaxed">
              {tip ?? "Your AI therapist is listening..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
