"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/cn";

type AccordionProps = {
  items: readonly { question: string; answer: string }[];
};

/**
 * One item open at a time. Kept as a plain button plus a grid-rows transition
 * so the panel animates without measuring heights in JS.
 */
export function Accordion({ items }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="text-title font-medium text-ink">
                {item.question}
              </span>
              <Plus
                size={20}
                weight="light"
                aria-hidden
                className={cn(
                  "shrink-0 text-ink-subtle transition-transform duration-(--dur-base) ease-out-expo",
                  isOpen && "rotate-45",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-(--dur-base) ease-out-expo",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="text-lead max-w-[62ch] pb-8 text-ink-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
