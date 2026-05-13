import Apod from "./components/Apod";
import Canvas from "./components/Canvas";
import Explore from "./components/Explore";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";

export default async function Home() {

const PLANETS = [
  "mercure", "venus", "terre", "mars",
  "jupiter", "saturne", "uranus", "neptune"
]

const planetsRes = await Promise.all(
  PLANETS.map((id) =>
    fetch(`https://api.le-systeme-solaire.net/rest/bodies/${id}`, {
      next: { revalidate: 86400 },
      headers: { Authorization: `Bearer ${process.env.SOLAR_API_KEY}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error(`Failed: ${r.status}`)
        return r.json()
      })
      .catch(() => null)
  )
)

// filter out any failed fetches
const planets = planetsRes.filter(Boolean)

const apodRes = await fetch(
  `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`,
  { next: { revalidate: 86400 } }
)
  .then((r) => r.json())
  .catch(() => null)

const results = await Promise.all(
  PLANETS.map((id) =>
    fetch(`https://api.le-systeme-solaire.net/rest/bodies/${id}`, {
      next: { revalidate: 86400 },
      headers: {
        Authorization: `Bearer ${process.env.SOLAR_API_KEY}`,
      },
    }).then((res) => res.json())
  )
)

const testRes = await fetch(
  `https://api.le-systeme-solaire.net/rest/bodies/terre`,
  {
    headers: { Authorization: `Bearer ${process.env.SOLAR_API_KEY}` },
  }
)
console.log("STATUS:", testRes.status)
console.log("SOLAR_API_KEY exists:", !!process.env.SOLAR_API_KEY)

  return (
    <div className="">
      <Canvas/>
      <Nav/>
      <Hero/>
      <Explore planets={results}/>
      {apodRes && <Apod data={apodRes}/>}
      <Footer/>
    </div>
  );
}