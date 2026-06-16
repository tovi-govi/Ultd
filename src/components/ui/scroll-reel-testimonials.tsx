import * as React from "react";

import { cn } from "@/lib/utils";

export interface ScrollReelTestimonial {
  quote: string;
  author: string;
  image: string;
  alt?: string;
}

export interface ScrollReelTestimonialsProps {
  testimonials: ScrollReelTestimonial[];
  charStaggerMs?: number;
  className?: string;
}

const CELL = 121.33;
const GAP = 8;
const STEP = 3 * (CELL + GAP);

const EXIT_MS = 240;
const SLIDE_MS = 800;
const EASE_INOUT = "cubic-bezier(0.65,0,0.35,1)";

const QUOTE_CLASSES =
  "m-0 font-display text-[1.35rem] font-bold leading-[1.14] text-foreground sm:text-[1.8rem]";
const AUTHOR_CLASSES =
  "m-0 text-sm font-extrabold uppercase leading-[1.35] tracking-wide text-muted-foreground";

const FEATURED_SHADOW =
  "0 1px 0.7px -0.5px rgba(0,0,0,0.18), 0 4px 3px -1.6px rgba(0,0,0,0.17), 0 12px 8px -2.8px rgba(0,0,0,0.15), 0 32px 23px -4px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.58)";

function Cell() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 rounded-md border border-border bg-gradient-to-b from-muted to-card blur-[1px] shadow-[inset_0_2px_0_rgba(255,255,255,0.65)]"
      style={{ width: CELL, height: CELL }}
    />
  );
}

function Featured({ src, alt }: { src: string; alt?: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-md bg-muted ring-1 ring-black/5"
      style={{ width: CELL, height: CELL, boxShadow: FEATURED_SHADOW }}
    >
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-white/30 mix-blend-saturation"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] blur-[6px] mix-blend-overlay"
        style={{
          background:
            "linear-gradient(220deg, rgba(215,182,76,0) 30%, rgba(215,182,76,0.82) 42%, rgba(110,231,216,0.48) 55%, rgba(110,231,216,0) 68%)",
        }}
      />
    </div>
  );
}

function Chars({
  text,
  startIndex,
  staggerMs,
}: {
  text: string;
  startIndex: number;
  staggerMs: number;
}) {
  let idx = startIndex;
  const words = text.split(" ");

  return (
    <>
      {words.map((word, wordIndex) => {
        const wordSpan = (
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, charIndex) => {
              const delay = idx * staggerMs;
              idx += 1;
              return (
                <span
                  key={`${char}-${charIndex}`}
                  className="scroll-reel-char"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );

        if (wordIndex < words.length - 1) idx += 1;

        return (
          <React.Fragment key={`${word}-${wordIndex}`}>
            {wordSpan}
            {wordIndex < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export function ScrollReelTestimonials({
  testimonials,
  charStaggerMs = 6,
  className,
}: ScrollReelTestimonialsProps) {
  const [index, setIndex] = React.useState(0);
  const [displayIndex, setDisplayIndex] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const animating = React.useRef(false);
  const timeouts = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  const count = testimonials.length;

  React.useEffect(() => {
    const scheduledTimeouts = timeouts.current;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
    return () => {
      cancelAnimationFrame(raf);
      scheduledTimeouts.forEach(clearTimeout);
    };
  }, []);

  const paginate = React.useCallback(
    (direction: 1 | -1) => {
      if (animating.current) return;
      const next = index + direction;
      if (next < 0 || next >= count) return;

      animating.current = true;
      setIndex(next);
      setExiting(true);

      timeouts.current.push(
        setTimeout(() => {
          setDisplayIndex(next);
          setExiting(false);
        }, EXIT_MS),
      );
      timeouts.current.push(
        setTimeout(() => {
          animating.current = false;
        }, SLIDE_MS),
      );
    },
    [count, index],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      paginate(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      paginate(-1);
    }
  };

  const middleItems = React.useMemo(() => {
    const items: Array<{ type: "cell" } | { type: "featured"; index: number }> = [];
    for (let i = 0; i < 3; i += 1) items.push({ type: "cell" });
    testimonials.forEach((_, testimonialIndex) => {
      items.push({ type: "featured", index: testimonialIndex });
      if (testimonialIndex < count - 1) items.push({ type: "cell" }, { type: "cell" });
    });
    for (let i = 0; i < 3; i += 1) items.push({ type: "cell" });
    return items;
  }, [count, testimonials]);

  const sideCellCount = 4 + 2 * count;
  const centerIndex = (count - 1) / 2;
  const middleY = (centerIndex - index) * STEP;
  const sideY = -middleY;
  const current = testimonials[displayIndex];

  const colStyle = (y: number): React.CSSProperties => ({
    transform: `translateY(${y}px)`,
    transition: mounted ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : "none",
  });

  if (!current) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Student testimonials"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(
        "relative flex w-full flex-col items-stretch gap-2.5 overflow-hidden rounded-md border border-border bg-card shadow-elegant outline-none focus-visible:ring-2 focus-visible:ring-ring md:min-h-[330px] md:flex-row",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="relative h-56 w-full shrink-0 self-stretch overflow-hidden md:h-auto md:w-[390px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:transition-none"
            style={colStyle(sideY)}
          >
            {Array.from({ length: sideCellCount }).map((_, cellIndex) => (
              <Cell key={cellIndex} />
            ))}
          </div>

          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:transition-none"
            style={colStyle(middleY)}
          >
            {middleItems.map((item, itemIndex) =>
              item.type === "featured" ? (
                <Featured
                  key={itemIndex}
                  src={testimonials[item.index].image}
                  alt={testimonials[item.index].alt}
                />
              ) : (
                <Cell key={itemIndex} />
              ),
            )}
          </div>

          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:transition-none"
            style={colStyle(sideY)}
          >
            {Array.from({ length: sideCellCount }).map((_, cellIndex) => (
              <Cell key={cellIndex} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch px-5 py-7 md:px-10 md:py-10">
        <div className="flex flex-col gap-3">
          <svg
            className="block h-12 w-12 text-primary/42"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4.58 17.32C3.55 16.23 3 15 3 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18zm10 0C13.55 16.23 13 15 13 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18z" />
          </svg>

          <div className="relative w-full max-w-[560px] overflow-hidden" aria-live="polite">
            <div aria-hidden="true" className="invisible flex min-h-[170px] flex-col gap-5">
              <p className={QUOTE_CLASSES}>{current.quote}</p>
              <p className={AUTHOR_CLASSES}>{current.author}</p>
            </div>
            <div
              key={displayIndex}
              className={cn(
                "absolute inset-x-0 top-0 flex flex-col gap-5 will-change-[transform,opacity]",
                exiting && "scroll-reel-exit",
              )}
            >
              <p className={QUOTE_CLASSES}>
                <Chars text={current.quote} startIndex={0} staggerMs={charStaggerMs} />
              </p>
              <p className={AUTHOR_CLASSES}>
                <Chars
                  text={current.author}
                  startIndex={current.quote.length + 6}
                  staggerMs={charStaggerMs}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 md:mt-0">
          <button
            type="button"
            onClick={() => paginate(-1)}
            disabled={index === 0}
            aria-label="Previous testimonial"
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-foreground/15 bg-transparent p-0 text-foreground transition hover:enabled:scale-105 disabled:cursor-default disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg
              className="h-3.5 w-3.5 opacity-70"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7.5 2.5 3.5 6l4 3.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            disabled={index === count - 1}
            aria-label="Next testimonial"
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-foreground/15 bg-transparent p-0 text-foreground transition hover:enabled:scale-105 disabled:cursor-default disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg
              className="h-3.5 w-3.5 opacity-70"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m4.5 2.5 4 3.5-4 3.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
