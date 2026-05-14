import { PLANETS_DATA } from "@/lib/planetsData";
import Apod from "./components/Apod";
import Canvas from "./components/Canvas";
import Explore from "./components/Explore";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";

export default async function Home() {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : `http://localhost:${process.env.PORT || 3000}`

  const apodRes = await fetch(
    `${baseUrl}/api/apod`,
    { next: { revalidate: 86400 } }
  )
    .then((r) => r.json())
    .catch(() => null)

  
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