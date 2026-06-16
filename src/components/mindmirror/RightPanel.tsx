import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Flame, Users, TrendingUp, Sprout } from "lucide-react";
import { useSessions } from "@/hooks/use-sessions";

export function RightPanel() {
  const { sessions } = useSessions();

  const data = useMemo(
    () =>
      sessions.map((s, i) => ({
        session: i + 1,
        mood: Math.max(0, Math.min(10, 10 - s.riskScore)),
      })),
    [sessions],
  );

  const streak = sessions.length;
  const delta = data.length >= 2 ? data[data.length - 1].mood - data[0].mood : 0;

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold tracking-tight">Mood Timeline</h2>
          <p className="text-xs text-muted-foreground">Last {Math.max(data.length, 0)} sessions</p>
        </div>
        {data.length >= 2 && (
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
        )}
      </div>

      <div className="h-44 rounded-lg bg-background p-3 ring-1 ring-border">
        {data.length === 0 ? (
          <div className="grid h-full place-items-center px-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Sprout className="h-7 w-7 text-primary" />
              <p className="text-sm text-muted-foreground">
                Save your first entry to start your mood timeline
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="session" stroke="var(--color-muted-foreground)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} stroke="var(--color-muted-foreground)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                  color: "var(--color-foreground)",
                }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ r: 4, fill: "var(--color-primary)", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "var(--color-primary)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="rounded-lg bg-background p-3 ring-1 ring-border">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-warning/20">
              <Flame className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Session Streak
              </p>
              <p className="text-2xl font-bold">{streak}</p>
            </div>
          </div>
          <p className="text-right text-[11px] leading-tight text-muted-foreground">
            Keep going<br />tomorrow
          </p>
        </div>
      </div>

      <Link
        to="/caregiver"
        className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-background px-4 py-3 text-sm font-semibold ring-1 ring-border transition hover:bg-surface-2"
      >
        <Users className="h-4 w-4" />
        Caregiver View
      </Link>
    </div>
  );
}
