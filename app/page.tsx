import { PLANETS_DATA } from "@/lib/planetsData";
import Apod from "./components/Apod";
import Canvas from "./components/Canvas";
import Explore from "./components/Explore";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";

export default function Home() {


  return (
    <div>
      <Canvas />
      <Nav />
      <Hero />
      <Explore planets={PLANETS_DATA} />
      <Apod/>
      <Footer />
    </div>
  );
}