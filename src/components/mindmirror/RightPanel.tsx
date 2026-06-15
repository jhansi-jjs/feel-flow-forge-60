import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Flame, Users, TrendingUp } from "lucide-react";
import { useSessions } from "@/hooks/use-sessions";

const SEED = [
  { session: "S1", mood: 4 },
  { session: "S2", mood: 5 },
  { session: "S3", mood: 3 },
  { session: "S4", mood: 6 },
  { session: "S5", mood: 5 },
  { session: "S6", mood: 7 },
  { session: "S7", mood: 6 },
];

export function RightPanel() {
  const { sessions } = useSessions();

  const data = useMemo(() => {
    if (sessions.length === 0) return SEED;
    const recent = sessions.slice(-7);
    const baseCount = Math.max(0, 7 - recent.length);
    const base = SEED.slice(0, baseCount);
    const live = recent.map((s, i) => ({
      session: `S${baseCount + i + 1}`,
      mood: s.mood,
    }));
    return [...base, ...live];
  }, [sessions]);

  const streak = 1 + sessions.length;
  const delta = data[data.length - 1].mood - data[0].mood;

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold tracking-tight">Mood Timeline</h2>
          <p className="text-xs text-muted-foreground">Last 7 sessions</p>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${
            delta >= 0
              ? "bg-positive/15 text-positive ring-positive/30"
              : "bg-sos/15 text-sos ring-sos/30"
          }`}
        >
          <TrendingUp className="h-3 w-3" />
          {delta >= 0 ? `+${delta}` : delta}
        </span>
      </div>

      <div className="h-56 rounded-2xl bg-surface-2/40 p-3 ring-1 ring-border">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="moodLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="oklch(0.7 0.18 320)" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="session" stroke="var(--color-muted-foreground)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 10]} stroke="var(--color-muted-foreground)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.75rem",
                fontSize: "12px",
                color: "var(--color-foreground)",
              }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="url(#moodLine)"
              strokeWidth={3}
              dot={{ r: 4, fill: "var(--color-primary)", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "var(--color-primary)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-[oklch(0.65_0.2_45)]/20 to-transparent p-4 ring-1 ring-border">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[oklch(0.65_0.2_45)]/20">
              <Flame className="h-5 w-5 text-[oklch(0.78_0.18_55)]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Session Streak
              </p>
              <p className="text-2xl font-bold">{streak} 🔥</p>
            </div>
          </div>
          <p className="text-right text-[11px] leading-tight text-muted-foreground">
            Keep going<br />tomorrow
          </p>
        </div>
      </div>

      <Link
        to="/caregiver"
        className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-surface-2 px-4 py-3 text-sm font-semibold ring-1 ring-border transition hover:bg-surface-2/70"
      >
        <Users className="h-4 w-4" />
        Caregiver View
      </Link>
    </div>
  );
}
