import type { ReactNode } from "react";

type PageTextProps = {
  title: string;
  children: ReactNode;
};

export default function PageText({ title, children }: PageTextProps) {
  return (
    <div className="rounded-lg p-4">
      <h1 className="font-display text-4xl leading-tight font-bold text-pink sm:text-5xl">
        {title}
      </h1>
      <div className="mt-4 space-y-3 text-xl leading-relaxed font-normal text-neutral-800 sm:text-2xl">
        {children}
      </div>
    </div>
  );
}
