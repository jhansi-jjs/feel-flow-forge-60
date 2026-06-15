import { useMemo, useState } from "react";
import { Feather, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const POSITIVE = ["good", "great", "happy", "calm", "grateful", "love", "joy", "hope", "peace", "proud", "excited", "amazing"];
const NEGATIVE = ["sad", "bad", "angry", "anxious", "stress", "tired", "hate", "worry", "afraid", "lonely", "hurt", "awful"];

type Sentiment = { label: string; tone: "positive" | "neutral" | "negative"; score: number };

function analyze(text: string): Sentiment {
  const words = text.toLowerCase().match(/\b[a-z']+\b/g) ?? [];
  let score = 0;
  for (const w of words) {
    if (POSITIVE.includes(w)) score += 1;
    if (NEGATIVE.includes(w)) score -= 1;
  }
  if (!words.length) return { label: "Start writing…", tone: "neutral", score: 0 };
  if (score > 0) return { label: "Positive", tone: "positive", score };
  if (score < 0) return { label: "Heavy", tone: "negative", score };
  return { label: "Neutral", tone: "neutral", score };
}

export function JournalPanel({ onSentiment }: { onSentiment?: (s: Sentiment) => void }) {
  const [text, setText] = useState("");
  const sentiment = useMemo(() => analyze(text), [text]);

  const toneStyles: Record<Sentiment["tone"], string> = {
    positive: "bg-[color-mix(in_oklab,var(--positive)_18%,transparent)] text-[color-mix(in_oklab,var(--positive)_60%,black)] ring-[color-mix(in_oklab,var(--positive)_40%,transparent)]",
    negative: "bg-[color-mix(in_oklab,var(--destructive)_15%,transparent)] text-[color-mix(in_oklab,var(--destructive)_60%,black)] ring-[color-mix(in_oklab,var(--destructive)_40%,transparent)]",
    neutral: "bg-muted text-muted-foreground ring-border",
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Today's journal</h2>
          <p className="text-xs text-muted-foreground">Write freely. We'll read the tone in real time.</p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition-all ${toneStyles[sentiment.tone]}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {sentiment.label}
        </span>
      </div>

      <div className="relative flex-1 rounded-3xl bg-card p-1 ring-1 ring-border shadow-soft">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How is your mind feeling right now? What's loud, what's quiet…"
          className="h-full min-h-[280px] resize-none border-0 bg-transparent text-base leading-relaxed shadow-none focus-visible:ring-0"
        />
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Feather className="h-3.5 w-3.5" />
          {text.trim().split(/\s+/).filter(Boolean).length} words
        </span>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            onSentiment?.(sentiment);
            setText("");
          }}
          disabled={!text.trim()}
          className="gap-1.5"
        >
          <Save className="h-3.5 w-3.5" />
          Save entry
        </Button>
      </div>
    </div>
  );
}
