import { PLANETS_DATA } from "@/lib/planetsData";
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


const apodRes = await fetch(
  `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`,
  { next: { revalidate: 86400 } }
)
  .then((r) => r.json())
  .catch(() => null)

  console.log("APOD:", apodRes)
  console.log("NASA KEY exists:", !!process.env.NASA_API_KEY)

  return (
    <div className="">
      <Canvas/>
      <Nav/>
      <Hero/>
      <Explore planets={PLANETS_DATA}/>
      {apodRes && <Apod data={apodRes}/>}
      <Footer/>
    </div>
  );
}