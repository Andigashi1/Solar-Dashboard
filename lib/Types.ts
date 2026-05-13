export type Planet = {
  id: string
  englishName: string
  gravity: number
  meanRadius: number
  sideralOrbit: number
  sideralRotation: number
  moons: { moon: string; rel: string }[] | null
  avgTemp: number
  mass: { massValue: number; massExponent: number } | null
  density: number
  discoveredBy: string
  discoveryDate: string
}

export type APODData = {
  title: string
  explanation: string
  url: string
  hdurl: string
  media_type: "image" | "video"
  date: string
  copyright?: string
}
