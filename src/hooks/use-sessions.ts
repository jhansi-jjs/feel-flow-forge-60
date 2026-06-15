import { useEffect, useState, useCallback } from "react";

export type Session = {
  entry: string;
  mood: number;
  riskScore: number;
  timestamp: number;
};

const KEY = "mindmirror_sessions";
const EVENT = "mindmirror:sessions-changed";

function read(): Session[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session[]) : [];
  } catch {
    return [];
  }
}

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    setSessions(read());
    const handler = () => setSessions(read());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const addSession = useCallback((s: Omit<Session, "timestamp"> & { timestamp?: number }) => {
    const next: Session = { ...s, timestamp: s.timestamp ?? Date.now() };
    const all = [...read(), next];
    window.localStorage.setItem(KEY, JSON.stringify(all));
    window.dispatchEvent(new Event(EVENT));
    return next;
  }, []);

  return { sessions, addSession };
}
