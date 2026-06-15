import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TrendingUp, Clock, Heart } from "lucide-react";

const HOURS = ["8a", "10a", "12p", "2p", "4p", "6p", "8p", "Now"];
const seed = [62, 58, 71, 65, 74, 68, 80, 76];

export function SummaryPanel() {
  const data = useMemo(() => HOURS.map((h, i) => ({ time: h, mood: seed[i] })), []);
  const avg = Math.round(seed.reduce((a, b) => a + b, 0) / seed.length);
  const delta = seed[seed.length - 1] - seed[0];

  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Session summary</h2>
        <p className="text-xs text-muted-foreground">Your mood across today</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Stat icon={<Heart className="h-3.5 w-3.5" />} label="Avg mood" value={`${avg}`} accent="primary" />
        <Stat icon={<TrendingUp className="h-3.5 w-3.5" />} label="Trend" value={`${delta > 0 ? "+" : ""}${delta}`} accent="positive" />
        <Stat icon={<Clock className="h-3.5 w-3.5" />} label="Session" value="24m" accent="calm" />
      </div>

      <div className="flex-1 min-h-[220px] rounded-3xl bg-card p-4 ring-1 ring-border shadow-soft">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="moodFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.45} />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" stroke="var(--color-muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[40, 100]} />
            <Tooltip
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.75rem",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="mood"
              stroke="var(--color-primary)"
              strokeWidth={2.5}
              fill="url(#moodFill)"
              dot={{ r: 3, fill: "var(--color-primary)", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-accent/40 to-primary/10 p-4 ring-1 ring-border">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reflection</p>
        <p className="mt-1 text-sm leading-relaxed">
          Your mood lifted gently after midday — consider what shifted around 2pm and repeat it tomorrow.
        </p>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: "primary" | "positive" | "calm";
}) {
  const color = `var(--color-${accent})`;
  return (
    <div className="rounded-2xl bg-card p-3 ring-1 ring-border">
      <div
        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
        style={{ background: `color-mix(in oklab, ${color} 15%, transparent)`, color }}
      >
        {icon}
        {label}
      </div>
      <p className="mt-1.5 text-xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
