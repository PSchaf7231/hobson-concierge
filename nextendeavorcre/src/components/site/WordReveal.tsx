import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface WordRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Stagger between words, in ms */
  stagger?: number;
  /** Initial delay before the first word, in ms */
  delay?: number;
  /** Optional override rendered before words (e.g. an em element) */
  children?: ReactNode;
}

/**
 * Splits `text` into per-word spans and fades them in on scroll-into-view.
 */
export function WordReveal({
  text,
  as,
  className,
  stagger = 80,
  delay = 0,
}: WordRevealProps) {
  const Tag = (as ?? "h2") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("in-view");
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(/(\s+)/); // preserve whitespace tokens

  return (
    <Tag ref={ref as never} className={`word-reveal ${className ?? ""}`}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return w;
        return (
          <span
            key={i}
            style={{ animationDelay: `${delay + i * stagger}ms` }}
          >
            {w}
          </span>
        );
      })}
    </Tag>
  );
}
