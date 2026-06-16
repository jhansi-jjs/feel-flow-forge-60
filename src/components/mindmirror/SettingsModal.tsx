import { X, Moon, Camera, Mic, Bell } from "lucide-react";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-background/80 p-4">
      <div className="w-80 rounded-xl bg-surface p-6 ring-1 ring-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Settings</h3>
          <button
            onClick={() => onOpenChange(false)}
            className="grid h-8 w-8 place-items-center rounded-lg bg-surface-2 ring-1 ring-border transition hover:bg-background"
            aria-label="Close settings"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Enable face detection on start</span>
            </div>
            <ToggleSwitch defaultChecked />
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Mic className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Enable voice input</span>
            </div>
            <ToggleSwitch defaultChecked />
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Send caregiver alerts</span>
            </div>
            <ToggleSwitch />
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Dark mode</span>
            </div>
            <ToggleSwitch defaultChecked disabled />
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch({ defaultChecked = false, disabled = false }: { defaultChecked?: boolean; disabled?: boolean }) {
  return (
    <button
      disabled={disabled}
      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors ${
        defaultChecked ? "bg-primary" : "bg-surface-2"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          defaultChecked ? "translate-x-4" : "translate-x-0"
        } mt-0.5 ml-0.5`}
      />
    </button>
  );
}
