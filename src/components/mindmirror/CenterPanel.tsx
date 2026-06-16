import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, Mic, Save, Calendar, Lightbulb } from "lucide-react";
import { useSessions } from "@/hooks/use-sessions";

const POSITIVE = ["good", "great", "happy", "calm", "grateful", "love", "joy", "hope", "peace", "proud", "amazing"];
const NEGATIVE = ["sad", "bad", "angry", "anxious", "stress", "tired", "hate", "worry", "afraid", "lonely", "hurt"];

function scoreText(t: string) {
  const words = t.toLowerCase().match(/\b[a-z']+\b/g) ?? [];
  let s = 0;
  for (const w of words) {
    if (POSITIVE.includes(w)) s += 1;
    if (NEGATIVE.includes(w)) s -= 1;
  }
  const mood = Math.max(0, Math.min(10, 5 + s));
  const risk = Math.max(0, Math.min(10, 5 - s));
  return { mood, risk };
}

function tipForRisk(r: number) {
  if (r <= 2) return "You're doing great today! Consistency is key — keep this journaling habit going. 🌟";
  if (r <= 4) return "You seem a bit low. Try the 5-4-3-2-1 grounding technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.";
  if (r <= 6) return "It sounds like you're going through something. Try box breathing: inhale 4s → hold 4s → exhale 4s → hold 4s. Repeat 4 times.";
  if (r <= 8) return "We hear you. You don't have to face this alone. Consider talking to someone you trust today. iCall India: 9152987821";
  return "We're concerned about you. Please reach out right now. Vandrevala Foundation (24/7): 1860-2662-345 | iCall: 9152987821";
}

export function CenterPanel() {
  const [text, setText] = useState("");
  const [tip, setTip] = useState<string | null>(null);
  const [tipKey, setTipKey] = useState(0);
  const { addSession } = useSessions();

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const analyze = () => {
    const { risk } = scoreText(text);
    setTip(tipForRisk(risk));
    setTipKey((k) => k + 1);
  };

  const save = () => {
    const entry = text.trim();
    if (!entry) {
      toast.error("Write something first");
      return;
    }
    const { mood, risk } = scoreText(entry);
    addSession({ entry, mood, riskScore: risk });
    toast.success("Entry saved ✓");
    setText("");
  };

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="min-w-0">
        <h2 className="truncate text-2xl font-bold tracking-tight">Today's Journal</h2>
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {today}
        </p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="How are you feeling right now? Write freely — this is private and never leaves your device."
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
        <button
          onClick={save}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-surface-2 px-4 py-2.5 text-sm font-semibold ring-1 ring-border transition hover:bg-surface-2/70"
        >
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
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">CBT Tip</p>
            <p
              key={tipKey}
              className="mt-1 text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-1 duration-500"
            >
              {tip ?? "Tap Analyse Now to get a personalised tip based on what you wrote."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
