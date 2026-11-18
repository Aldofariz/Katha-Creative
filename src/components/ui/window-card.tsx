import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TrafficLights } from "@/components/ui/traffic-lights";

type WindowCardProps = {
  title: string;
  children: ReactNode;
  active?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onZoom?: () => void;
  sidebar?: ReactNode;
  titleContent?: ReactNode;
  toolbar?: ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function WindowCard({
  title,
  children,
  active = true,
  onClose,
  onMinimize,
  onZoom,
  sidebar,
  titleContent,
  toolbar,
  className,
  bodyClassName,
}: WindowCardProps) {
  return (
    <section
      className={cn(
        "window-surface rounded-window relative flex min-w-0 flex-col overflow-hidden",
        className,
      )}
    >
      <header
        className={cn(
          "vibrancy border-line-strong relative flex shrink-0 items-center border-b px-2",
          toolbar ? "h-[52px]" : "h-7",
        )}
      >
        <TrafficLights
          active={active}
          onClose={onClose}
          onMinimize={onMinimize}
          onZoom={onZoom}
        />
        {titleContent ? (
          <div className="absolute left-1/2 flex max-w-[75%] -translate-x-1/2 items-center">
            {titleContent}
          </div>
        ) : (
          <span
            className={cn(
              "absolute left-1/2 max-w-[55%] -translate-x-1/2 truncate text-[13px] font-semibold",
              active ? "text-ink/85" : "text-ink/40",
            )}
          >
            {title}
          </span>
        )}
        {toolbar ? (
          <div className="ml-auto flex min-w-0 items-center gap-2">
            {toolbar}
          </div>
        ) : null}
      </header>
      <div className="flex min-h-0 flex-1">
        {sidebar ? (
          <aside className="border-line-strong bg-surface min-w-40 border-r p-3">
            {sidebar}
          </aside>
        ) : null}
        <div className={cn("min-w-0 flex-1 p-6", bodyClassName)}>
          {children}
        </div>
      </div>
    </section>
  );
}
