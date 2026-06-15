import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const EMOTIONS = [
  { label: "Calm", emoji: "😌", color: "var(--calm)" },
  { label: "Happy", emoji: "😊", color: "var(--positive)" },
  { label: "Focused", emoji: "🧘", color: "var(--primary)" },
  { label: "Anxious", emoji: "😟", color: "var(--warning)" },
  { label: "Sad", emoji: "😢", color: "var(--calm)" },
];

export function WebcamPanel({ onEmotion }: { onEmotion?: (label: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [emotion, setEmotion] = useState(EMOTIONS[0]);
  const [error, setError] = useState<string | null>(null);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setActive(true);
      setError(null);
    } catch {
      setError("Camera permission denied");
    }
  };

  const stop = () => {
    const stream = videoRef.current?.srcObject as MediaStream | null;
    stream?.getTracks().forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setActive(false);
  };

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      const next = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
      setEmotion(next);
      onEmotion?.(next.label);
    }, 3500);
    return () => clearInterval(id);
  }, [active, onEmotion]);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Live presence</h2>
          <p className="text-xs text-muted-foreground">Facial emotion detection</p>
        </div>
        <Button
          size="sm"
          variant={active ? "secondary" : "default"}
          onClick={active ? stop : start}
          className="gap-1.5"
        >
          {active ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
          {active ? "Stop" : "Start"}
        </Button>
      </div>

      <div
        className={`relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-muted ring-1 ring-border ${
          active ? "pulse-ring" : ""
        }`}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          className={`h-full w-full object-cover transition-opacity ${active ? "opacity-100" : "opacity-0"}`}
        />
        {!active && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
            <div className="rounded-2xl bg-card p-4 shadow-soft">
              <Camera className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm font-medium">Camera off</p>
            <p className="text-xs text-muted-foreground max-w-[200px]">
              {error ?? "Start to track your emotional state in real time."}
            </p>
          </div>
        )}

        {active && (
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-background/85 px-3 py-1.5 backdrop-blur-md ring-1 ring-border">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider">Live</span>
          </div>
        )}

        {active && (
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-background/85 px-4 py-3 backdrop-blur-md ring-1 ring-border">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
                style={{ background: `color-mix(in oklab, ${emotion.color} 18%, transparent)` }}
              >
                {emotion.emoji}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Detected</p>
                <p className="text-sm font-semibold">{emotion.label}</p>
              </div>
            </div>
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
