import { PLANETS_DATA } from "@/lib/planetsData";
import Apod from "./components/Apod";
import Canvas from "./components/Canvas";
import Explore from "./components/Explore";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";

export default async function Home() {
  const apodRes = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`,
    { cache: "no-store" }
  )
    .then((r) => r.json())
    .catch(() => null)

  const apod = apodRes?.media_type ? apodRes : null

  return (
    <div>
      <Canvas />
      <Nav />
      <Hero />
      <Explore planets={PLANETS_DATA} />
      {apod && <Apod data={apod} />}
      <Footer />
    </div>
  );
}