import { useState } from "react";
import { Flame, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function TopBar({ name = "Alex", streak = 12 }: { name?: string; streak?: number }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between gap-4 rounded-3xl bg-card/70 px-5 py-3 backdrop-blur-md ring-1 ring-border shadow-soft">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Welcome back</p>
          <p className="text-sm font-semibold">{name}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-[color-mix(in_oklab,var(--warning)_25%,transparent)] to-[color-mix(in_oklab,var(--positive)_25%,transparent)] px-3.5 py-1.5 ring-1 ring-border">
          <Flame className="h-4 w-4 text-[color-mix(in_oklab,var(--warning)_60%,black)]" />
          <span className="text-sm font-semibold">{streak}</span>
          <span className="text-xs text-muted-foreground">day streak</span>
        </div>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button className="sos-flash gap-1.5 rounded-full bg-[var(--sos)] px-4 font-bold text-[var(--sos-foreground)] hover:bg-[color-mix(in_oklab,var(--sos)_85%,black)]">
              <Phone className="h-4 w-4" />
              SOS
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>You are not alone</AlertDialogTitle>
              <AlertDialogDescription>
                Connect with a crisis counselor immediately. Available 24/7, free and confidential.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-2 rounded-2xl bg-muted p-4 text-sm">
              <p><strong>988</strong> — Suicide & Crisis Lifeline (US)</p>
              <p><strong>Text HOME to 741741</strong> — Crisis Text Line</p>
              <p><strong>112 / 911</strong> — Emergency services</p>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction asChild>
                <a href="tel:988" className="bg-[var(--sos)] text-[var(--sos-foreground)] hover:bg-[color-mix(in_oklab,var(--sos)_85%,black)]">
                  Call 988
                </a>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
}
