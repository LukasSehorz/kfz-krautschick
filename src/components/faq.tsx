"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/services";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <dl className="border-t border-line">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-line">
            <dt>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-btn-${i}`}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="font-serif text-lg text-foreground sm:text-xl">
                  {f.q}
                </span>
                <Plus
                  aria-hidden
                  className={`mt-1 h-5 w-5 shrink-0 text-amber transition-transform duration-500 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>
            </dt>
            <dd
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              hidden={!isOpen}
            >
              <p className="max-w-2xl pb-7 pr-10 text-sm leading-relaxed text-muted">
                {f.a}
              </p>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
