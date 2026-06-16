import { useEffect, useState } from "react";
import { Brain } from "lucide-react";

const KEY = "mindmirror_visited";

export function Onboarding() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    window.localStorage.setItem(KEY, "true");
    setClosing(true);
    setTimeout(() => setVisible(false), 350);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-background/90 backdrop-blur-md p-6 transition-opacity duration-300 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-lg rounded-3xl bg-surface/90 p-8 text-center ring-1 ring-border shadow-soft animate-in fade-in zoom-in-95 duration-500">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.45_0.22_300)] shadow-glow">
          <Brain className="h-10 w-10 text-primary-foreground" />
        </div>
        <h2 className="mt-5 text-2xl font-bold tracking-tight">Welcome to MindMirror AI</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Your private, multimodal mental health companion. Your camera, voice, and journal never leave your device.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {["📷 Face Detection", "🎙 Voice Analysis", "✍️ Text Sentiment"].map((p) => (
            <span
              key={p}
              className="rounded-full bg-surface-2/70 px-3 py-1.5 text-xs font-medium ring-1 ring-border"
            >
              {p}
            </span>
          ))}
        </div>
        <button
          onClick={dismiss}
          className="mt-7 w-full rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
        >
          Get Started →
        </button>
      </div>
    </div>
  );
}
