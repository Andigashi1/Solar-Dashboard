"use client";

import { Planet } from "@/lib/Types";
import { useState, useRef } from "react";
import Image from "next/image";
import { PLANET_IMAGES } from "@/lib/planetImages";
import DataPanel from "./DataPanel";

type Props = {
  planets: Planet[];
};

const Explore = ({ planets }: Props) => {
  const [selected, setSelected] = useState<Planet | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="explore"
      className="w-full min-h-screen py-24  max-md:px-4 px-8"
    >
      <div className="px-8 mb-12">
        <h2 className="font-display font-bold uppercase tracking-widest text-4xl text-text-primary">
          Explore
        </h2>
        <p className="font-body text-text-secondary mt-2 text-sm">
          Select a planet to learn more
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-8 pb-12 scrollbar-violet"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {planets.map((planet) => (
          <button
            key={planet.id}
            onClick={() =>
              setSelected(selected?.id === planet.id ? null : planet)
            }
            className={`flex-none flex flex-col items-center gap-4 p-6 rounded-2xl border
              transition-all duration-300
              ${
                selected?.id === planet.id
                  ? "border-violet/60 bg-surface-elevated"
                  : "border-border bg-surface hover:border-violet/30 hover:bg-surface-elevated"
              }`}
            style={{ scrollSnapAlign: "center" }}
          >
            <div className="relative w-64 h-64">
              <Image
                src={PLANET_IMAGES[planet.id]}
                sizes="24"
                alt={planet.englishName}
                fill
                className="object-contain mix-blend-lighten"
              />
            </div>
            <span className="font-display uppercase tracking-widest text-sm text-text-primary">
              {planet.englishName}
            </span>
          </button>
        ))}
      </div>

      {selected && <DataPanel selected={selected}/>}
    </section>
  );
};

export default Explore
