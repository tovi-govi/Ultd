import { useEffect, useMemo, useRef, useState, type ElementType } from "react";
import { Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  statusLabel?: string;
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  className?: string;
  metricLabel?: string;
}

export default function RadialOrbitalTimeline({
  timelineData,
  className,
  metricLabel = "Readiness",
}: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(timelineData[0]?.id ?? null);
  const [stageSize, setStageSize] = useState({ width: 640, height: 520 });
  const stageRef = useRef<HTMLDivElement>(null);

  const activeItem = useMemo(
    () => timelineData.find((item) => item.id === activeNodeId) ?? timelineData[0],
    [activeNodeId, timelineData],
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateSize = () => {
      const rect = stage.getBoundingClientRect();
      setStageSize({ width: rect.width, height: rect.height });
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(stage);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!autoRotate || prefersReducedMotion) return;

    const rotationTimer = window.setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.24) % 360).toFixed(3)));
    }, 50);

    return () => window.clearInterval(rotationTimer);
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    if (nodeIndex < 0) return;

    const targetAngle = (nodeIndex / timelineData.length) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    const isActive = activeNodeId === id;
    setActiveNodeId(isActive ? null : id);
    setAutoRotate(isActive);

    if (!isActive) centerViewOnNode(id);
  };

  const getStatusLabel = (status: TimelineItem["status"]) => {
    if (status === "completed") return "Complete";
    if (status === "in-progress") return "In progress";
    return "Pending";
  };

  const getStatusStyles = () => "border-primary/40 bg-primary text-primary-foreground";

  const orbitRadius = Math.max(
    108,
    Math.min(220, Math.min(stageSize.width, stageSize.height) * 0.34),
  );
  const center = { x: stageSize.width / 2, y: stageSize.height / 2 };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const x = orbitRadius * Math.cos(radian);
    const y = orbitRadius * Math.sin(radian);
    const depth = (1 + Math.sin(radian)) / 2;

    return {
      x,
      y,
      angle,
      zIndex: Math.round(100 + 40 * depth),
      opacity: Math.max(0.52, 0.58 + 0.42 * depth),
    };
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-white/10 bg-black text-white shadow-elegant",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.18),transparent_32%)]" />
      <div className="relative grid min-h-[42rem] lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div
          ref={stageRef}
          className="relative min-h-[31rem] overflow-hidden border-b border-white/10 lg:min-h-[42rem] lg:border-b-0 lg:border-r"
          onMouseEnter={() => setAutoRotate(false)}
          onMouseLeave={() => !activeNodeId && setAutoRotate(true)}
        >
          <div
            className="absolute rounded-full border border-sky-400/25"
            style={{
              left: center.x - orbitRadius,
              top: center.y - orbitRadius,
              width: orbitRadius * 2,
              height: orbitRadius * 2,
            }}
          />
          <div
            className="absolute rounded-full border border-white/10"
            style={{
              left: center.x - orbitRadius * 0.66,
              top: center.y - orbitRadius * 0.66,
              width: orbitRadius * 1.32,
              height: orbitRadius * 1.32,
            }}
          />

          <div
            className="absolute grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-sky-300/45 bg-sky-500/18 text-sky-100 shadow-[0_0_54px_-20px_rgba(56,189,248,0.72)]"
            style={{ left: center.x, top: center.y }}
          >
            <div className="absolute h-28 w-28 rounded-full border border-sky-400/25 animate-ping" />
            <div className="absolute h-36 w-36 rounded-full border border-white/10 animate-pulse" />
            <Zap className="relative h-7 w-7" />
          </div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isActive = activeNodeId === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                className="absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-3 text-center transition-all duration-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                style={{
                  left: center.x + position.x,
                  top: center.y + position.y,
                  zIndex: isActive ? 200 : position.zIndex,
                  opacity: isActive ? 1 : position.opacity,
                }}
                onClick={() => toggleItem(item.id)}
                aria-pressed={isActive}
              >
                <span
                  className={cn(
                    "absolute rounded-full transition-all",
                    isActive && "animate-pulse",
                  )}
                  style={{
                    width: item.energy * 0.52 + 42,
                    height: item.energy * 0.52 + 42,
                    background: isActive
                      ? "radial-gradient(circle, rgba(215,182,76,0.3) 0%, rgba(215,182,76,0) 70%)"
                      : "radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(56,189,248,0) 70%)",
                  }}
                />
                <span
                  className={cn(
                    "relative grid h-12 w-12 place-items-center rounded-full border-2 transition duration-300",
                    isActive
                      ? "scale-125 border-primary bg-primary text-primary-foreground shadow-glow"
                      : "border-sky-300/55 bg-sky-500/14 text-sky-100 shadow-[0_0_28px_-18px_rgba(56,189,248,0.95)]",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={cn(
                    "max-w-28 text-xs font-extrabold uppercase leading-tight tracking-wide transition duration-300",
                    isActive ? "text-primary" : "text-sky-100/78",
                  )}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        <aside className="flex min-h-[22rem] flex-col justify-center p-5 sm:p-7">
          {activeItem && (
            <Card className="rounded-md border-white/12 bg-black/72 text-white shadow-none backdrop-blur-xl">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Badge className={cn("rounded-md px-2.5 py-1", getStatusStyles())}>
                    {activeItem.statusLabel ?? getStatusLabel(activeItem.status)}
                  </Badge>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wide text-white/48">
                    {activeItem.date}
                  </span>
                </div>
                <CardTitle className="mt-4 font-display text-2xl font-extrabold leading-tight">
                  {activeItem.title}
                </CardTitle>
                <p className="text-sm font-bold text-primary">{activeItem.category}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-white/72">{activeItem.content}</p>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-white/62">
                    <span className="inline-flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-primary" />
                      {metricLabel}
                    </span>
                    <span>{activeItem.energy}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${activeItem.energy}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
