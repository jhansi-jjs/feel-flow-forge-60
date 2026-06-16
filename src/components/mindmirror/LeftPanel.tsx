import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Activity, Mic, MessageSquare, ShieldAlert, Phone } from "lucide-react";

const EMOTIONS = [
  { emoji: "😔", label: "Sad", confidence: 78 },
  { emoji: "😌", label: "Calm", confidence: 84 },
  { emoji: "😟", label: "Anxious", confidence: 71 },
  { emoji: "🙂", label: "Content", confidence: 66 },
  { emoji: "🧘", label: "Focused", confidence: 88 },
];

export function LeftPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [denied, setDenied] = useState(false);
  const [current, setCurrent] = useState(EMOTIONS[0]);

  const toggle = async () => {
    if (active) {
      const s = videoRef.current?.srcObject as MediaStream | null;
      s?.getTracks().forEach((t) => t.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setActive(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setDenied(false);
      setActive(true);
    } catch {
      setDenied(true);
    }
  };

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setCurrent(EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)]);
    }, 3500);
    return () => clearInterval(id);
  }, [active]);

  const stats = [
    { icon: Camera, label: "Face Emotion", value: current.label, tone: "primary" as const },
    { icon: Mic, label: "Voice Tone", value: "Soft", tone: "positive" as const },
    { icon: MessageSquare, label: "Text Sentiment", value: "Neutral", tone: "warning" as const },
    { icon: ShieldAlert, label: "Risk Score", value: "3 / 10", tone: "sos" as const },
  ];

  return (
    <div className="flex h-full flex-col gap-5">
      {/* Webcam */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div
            className={`relative grid h-44 w-44 place-items-center overflow-hidden rounded-full ring-4 ring-primary/60 ${
              active ? "pulse-ring" : ""
            }`}
            style={{ background: "var(--color-surface-2)" }}
          >
            <video
              ref={videoRef}
              muted
              playsInline
              className={`h-full w-full object-cover transition-opacity ${active ? "opacity-100" : "opacity-0"}`}
            />
            {!active && (
              <div className="absolute inset-0 grid place-items-center">
                <Camera className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
          </div>
          <button
            onClick={toggle}
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
          >
            {active ? <CameraOff className="h-3.5 w-3.5" /> : <Camera className="h-3.5 w-3.5" />}
            {active ? "Stop" : "Start"}
          </button>
        </div>

        <div className="mt-2 text-center">
          <p className="text-2xl font-bold tracking-tight">
            <span className="mr-1">{current.emoji}</span>
            {current.label}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{current.confidence}%</span> confidence
          </p>
        </div>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((s) => {
          const color = `var(--color-${s.tone})`;
          return (
            <div
              key={s.label}
              className="rounded-2xl bg-surface-2/60 p-3 ring-1 ring-border"
            >
              <div className="flex items-center gap-1.5">
                <s.icon className="h-3 w-3" style={{ color }} />
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>
              <p className="mt-1.5 text-sm font-bold">{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* SOS */}
      <button className="sos-flash mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-sos px-4 py-3.5 text-sm font-bold text-white transition hover:opacity-95">
        <Phone className="h-4 w-4" />
        🔴 SOS Alert
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
        <Activity className="h-3 w-3" />
        Monitoring {active ? "live" : "paused"}
      </div>
    </div>
  );
}
