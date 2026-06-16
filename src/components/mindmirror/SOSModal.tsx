import { X, Phone } from "lucide-react";

export const SOS_EVENT = "mindmirror:open-sos";

interface SOSModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SOSModal({ open, onOpenChange }: SOSModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center gap-4 bg-background/95 p-6">
      <div className="text-6xl">🆘</div>
      <h2 className="text-2xl font-bold text-foreground">You are not alone</h2>
      <p className="text-muted-foreground">Reach out to someone right now:</p>

      <div className="flex flex-col gap-3 mt-2">
        <a
          href="tel:9152987821"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Phone className="h-5 w-5" />
          iCall India: 9152987821
        </a>
        <a
          href="tel:18602662345"
          className="inline-flex items-center gap-2 rounded-lg bg-surface px-6 py-3 text-base font-semibold ring-1 ring-border transition hover:bg-surface-2"
        >
          <Phone className="h-5 w-5" />
          Vandrevala Foundation 24/7: 1860-2662-345
        </a>
        <a
          href="tel:08046110007"
          className="inline-flex items-center gap-2 rounded-lg bg-surface px-6 py-3 text-base font-semibold ring-1 ring-border transition hover:bg-surface-2"
        >
          <Phone className="h-5 w-5" />
          NIMHANS Bangalore: 080-46110007
        </a>
      </div>

      <button
        onClick={() => onOpenChange(false)}
        className="mt-4 rounded-lg bg-surface px-6 py-2 text-sm font-medium ring-1 ring-border transition hover:bg-surface-2"
      >
        I'm okay, go back
      </button>
    </div>
  );
}
