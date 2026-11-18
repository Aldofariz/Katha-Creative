import { cn } from "@/lib/cn";

type LightTone = "close" | "minimize" | "zoom";

type TrafficLightsProps = {
  active?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onZoom?: () => void;
  className?: string;
};

type TrafficLightProps = {
  tone: LightTone;
  active: boolean;
  label: string;
  glyph: string;
  onClick?: () => void;
};

const lightStyles: Record<LightTone, string> = {
  close: "bg-dot-close border-dot-close-edge text-ink",
  minimize: "bg-dot-min border-dot-min-edge text-ink",
  zoom: "bg-dot-zoom border-dot-zoom-edge text-ink",
};

function TrafficLight({ tone, active, label, glyph, onClick }: TrafficLightProps) {
  const dotClass = cn(
    "flex size-3 items-center justify-center rounded-full border-[0.5px] text-[10px] font-bold leading-none transition-opacity",
    active ? lightStyles[tone] : "border-dot-inactive bg-dot-inactive text-ink",
  );
  const dot = (
    <span aria-hidden="true" className={dotClass}>
      <span className="opacity-0 group-hover/traffic-lights:opacity-100">{glyph}</span>
    </span>
  );

  if (!onClick) {
    return <span className="grid size-5 place-items-center">{dot}</span>;
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="focus-visible:outline-accent grid size-5 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-1"
    >
      {dot}
    </button>
  );
}

export function TrafficLights({
  active = true,
  onClose,
  onMinimize,
  onZoom,
  className,
}: TrafficLightsProps) {
  return (
    <div className={cn("group/traffic-lights flex items-center gap-1", className)}>
      <TrafficLight tone="close" active={active} label="Close" glyph={String.fromCharCode(215)} onClick={onClose} />
      <TrafficLight tone="minimize" active={active} label="Minimize" glyph={String.fromCharCode(8722)} onClick={onMinimize} />
      <TrafficLight tone="zoom" active={active} label="Zoom" glyph="+" onClick={onZoom} />
    </div>
  );
}


