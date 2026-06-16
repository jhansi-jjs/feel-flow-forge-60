import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, Mic, Save, Calendar, Lightbulb } from "lucide-react";
import { useSessions } from "@/hooks/use-sessions";

const NEGATIVE_WORDS = [
  "sad", "tired", "hopeless", "anxious", "scared", "alone", "hurt", "bad",
  "depressed", "empty", "cry", "crying", "pain", "numb", "worthless",
  "dark", "lost", "broken", "fear", "worried", "helpless", "miserable",
  "hate", "angry", "useless", "stress", "afraid", "lonely",
];

const POSITIVE_WORDS = [
  "happy", "good", "great", "love", "excited", "fine", "okay", "joy",
  "grateful", "thankful", "calm", "peaceful", "smile", "proud", "hopeful",
  "better", "wonderful", "amazing", "blessed", "motivated",
];

function analyzeText(text: string) {
  const words = text.toLowerCase().split(/\s+/);
  const negCount = words.filter((w) => NEGATIVE_WORDS.includes(w)).length;
  const posCount = words.filter((w) => POSITIVE_WORDS.includes(w)).length;
  const score = Math.max(0, Math.min(10, negCount * 2 - posCount));
  const sentiment = posCount > negCount ? "Positive" : negCount > posCount ? "Negative" : "Neutral";
  return { riskScore: score, sentiment, posCount, negCount };
}

function tipForRisk(r: number) {
  if (r <= 2) return "You're doing great today! Consistency is key — keep this journaling habit going. 🌟";
  if (r <= 4) return "You seem a bit low. Try 5-4-3-2-1 grounding: name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.";
  if (r <= 6) return "Try box breathing: inhale 4s → hold 4s → exhale 4s → hold 4s. Repeat 4 times.";
  if (r <= 8) return "You don't have to face this alone. Talk to someone you trust. iCall India: 9152987821";
  return "Please reach out right now. Vandrevala Foundation 24/7: 1860-2662-345 | iCall: 9152987821";
}

export function CenterPanel() {
  const [text, setText] = useState("");
  const [tip, setTip] = useState<string | null>(null);
  const [tipKey, setTipKey] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [voiceTone, setVoiceTone] = useState("—");
  const { addSession } = useSessions();

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const analyze = () => {
    const { riskScore } = analyzeText(text);
    setTip(tipForRisk(riskScore));
    setTipKey((k) => k + 1);
  };

  const startVoice = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Please use Google Chrome for voice input.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.onstart = () => {
      setIsListening(true);
      setVoiceTone("Listening...");
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => {
      setIsListening(false);
      setVoiceTone("Error — try again");
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setText((prev) => (prev ? prev + " " + transcript : transcript));
      setVoiceTone("Captured ✓");
    };
    recognition.start();
  };

  const save = () => {
    const entry = text.trim();
    if (!entry) {
      toast.error("Please write something first.");
      return;
    }
    const { riskScore } = analyzeText(entry);
    const mood = Math.max(0, Math.min(10, 10 - riskScore));
    addSession({ entry, mood, riskScore });
    toast.success("Entry saved ✓");
    setText("");
    setTip(null);
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
        className="min-h-[200px] flex-1 resize-none rounded-lg bg-background p-3 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/70 ring-1 ring-border outline-none transition focus:ring-2 focus:ring-primary/50"
      />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button
          onClick={analyze}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
        >
          <Sparkles className="h-4 w-4" />
          Analyse Now
        </button>
        <button
          onClick={startVoice}
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold ring-1 ring-border transition ${
            isListening ? "bg-sos text-white" : "bg-background hover:bg-surface-2"
          }`}
        >
          <Mic className="h-4 w-4" />
          {isListening ? "Listening..." : `Voice Input ${voiceTone !== "—" ? "🎙" : "🎙"}`}
        </button>
        <button
          onClick={save}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-background px-4 py-2.5 text-sm font-semibold ring-1 ring-border transition hover:bg-surface-2"
        >
          <Save className="h-4 w-4" />
          Save Entry
        </button>
      </div>

      <div className="rounded-lg bg-background p-3 ring-1 ring-border" style={{ borderLeft: "3px solid var(--color-primary)" }}>
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/20 text-primary">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">CBT Tip</p>
            <p
              key={tipKey}
              className="mt-1 text-sm leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-bottom-1 duration-500"
            >
              {tip ?? "Tap Analyse Now to get a personalised tip based on what you wrote."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
