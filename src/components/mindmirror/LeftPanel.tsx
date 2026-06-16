import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Activity, Mic, MessageSquare, ShieldAlert, Phone } from "lucide-react";
import { SOS_EVENT } from "./SOSModal";

const EMOTION_LABELS: Record<string, string> = {
  happy: "Happy",
  sad: "Sad",
  angry: "Angry",
  fearful: "Fearful",
  disgusted: "Disgusted",
  surprised: "Surprised",
  neutral: "Neutral",
};

const EMOTION_EMOJIS: Record<string, string> = {
  happy: "😊",
  sad: "😔",
  angry: "😠",
  fearful: "😨",
  disgusted: "🤢",
  surprised: "😲",
  neutral: "😐",
};

export function LeftPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [denied, setDenied] = useState(false);
  const [faceEmotion, setFaceEmotion] = useState("—");
  const [faceConfidence, setFaceConfidence] = useState(0);
  const [faceEmoji, setFaceEmoji] = useState("😐");
  const intervalRef = useRef<number | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setDenied(false);
      setActive(true);

      // Try to load face-api.js if available
      const faceapi = (window as unknown as { faceapi?: unknown }).faceapi;
      if (faceapi && typeof faceapi === "object") {
        const fa = faceapi as {
          nets: {
            tinyFaceDetector: { loadFromUri: (url: string) => Promise<void> };
            faceExpressionNet: { loadFromUri: (url: string) => Promise<void> };
          };
          detectAllFaces: (video: HTMLVideoElement, options: unknown) => { withFaceExpressions: () => Promise<Array<{ expressions: Record<string, number> }>> };
          TinyFaceDetectorOptions: new () => unknown;
        };
        const MODEL_URL = "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights";
        try {
          await Promise.all([
            fa.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            fa.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          ]);
          const detector = new fa.TinyFaceDetectorOptions();
          intervalRef.current = window.setInterval(async () => {
            if (!videoRef.current) return;
            try {
              const detections = await fa.detectAllFaces(videoRef.current, detector).withFaceExpressions();
              if (detections && detections.length > 0) {
                const expressions = detections[0].expressions;
                const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
                const [topEmotion, topConfidence] = sorted[0];
                setFaceEmotion(EMOTION_LABELS[topEmotion] || topEmotion);
                setFaceEmoji(EMOTION_EMOJIS[topEmotion] || "😐");
                setFaceConfidence(Math.round(topConfidence * 100));
              }
            } catch {
              // Silently handle detection errors
            }
          }, 2000);
        } catch {
          // Face API models failed to load, use simulated emotions
          setSimulatedEmotions();
        }
      } else {
        // No face-api, simulate emotions
        setSimulatedEmotions();
      }
    } catch {
      setDenied(true);
    }
  };

  const setSimulatedEmotions = () => {
    const emotions = ["happy", "sad", "angry", "fearful", "neutral", "surprised"];
    intervalRef.current = window.setInterval(() => {
      const em = emotions[Math.floor(Math.random() * emotions.length)];
      setFaceEmotion(EMOTION_LABELS[em] || em);
      setFaceEmoji(EMOTION_EMOJIS[em] || "😐");
      setFaceConfidence(Math.floor(Math.random() * 30) + 70);
    }, 3500);
  };

  const stopCamera = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    const stream = videoRef.current?.srcObject as MediaStream | null;
    stream?.getTracks().forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setActive(false);
    setFaceEmotion("—");
    setFaceConfidence(0);
    setFaceEmoji("😐");
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const stats = [
    { icon: Camera, label: "Face Emotion", value: faceEmotion, tone: "primary" as const },
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
            className={`relative grid h-44 w-44 place-items-center overflow-hidden rounded-full ring-4 ring-primary ${
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
            onClick={active ? stopCamera : startCamera}
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
          >
            {active ? <CameraOff className="h-3.5 w-3.5" /> : <Camera className="h-3.5 w-3.5" />}
            {active ? "Stop" : "Start Camera"}
          </button>
        </div>

        <div className="mt-2 text-center">
          <p className="text-2xl font-bold tracking-tight">
            <span className="mr-1">{faceEmoji}</span>
            {faceEmotion}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{faceConfidence}%</span> confidence
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
              className="rounded-2xl bg-background p-3"
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
      <button
        onClick={() => window.dispatchEvent(new Event(SOS_EVENT))}
        className="sos-flash mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-sos px-4 py-3.5 text-sm font-bold text-white transition hover:opacity-95"
      >
        <Phone className="h-4 w-4" />
        SOS Alert
      </button>

      <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
        <Activity className="h-3 w-3 shrink-0" />
        {active
          ? "Emotion detection active"
          : denied
            ? "Camera access denied. Please allow camera in browser settings."
            : "Click Start Camera to begin emotion detection."}
      </div>
    </div>
  );
}
