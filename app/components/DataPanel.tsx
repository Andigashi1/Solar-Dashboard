import Stat from "./Stat"
import { Planet } from "@/lib/Types"

type Props = {
  selected: Planet;
};

const DataPanel = ({selected} : Props) => {
  return (
    <div className="mx-8 mt-8 p-8 rounded-2xl border border-border bg-surface">
          <h3 className="font-display font-bold uppercase tracking-widest text-2xl text-text-primary mb-6">
            {selected.englishName}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Stat label="Gravity" value={`${selected.gravity} m/s²`} />
            <Stat label="Radius" value={`${selected.meanRadius.toLocaleString()} km`} />
            <Stat label="Orbital Period" value={`${Math.round(selected.sideralOrbit)} days`} />
            <Stat label="Moons" value={selected.moons ? selected.moons.length : 0} />
            <Stat label="Avg Temperature" value={`${selected.avgTemp} K`} />
            <Stat label="Density" value={`${selected.density} g/cm³`} />
            {selected.mass && (
              <Stat
                label="Mass"
                value={`${selected.mass.massValue} × 10^${selected.mass.massExponent} kg`}
              />
            )}
            {selected.discoveredBy && (
              <Stat label="Discovered By" value={selected.discoveredBy} />
            )}
          </div>
        </div>
  )
}

export default DataPanel