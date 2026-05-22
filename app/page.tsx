import Hero from "@/components/HomeComponents/Hero/Hero";
import css from "../components/HomeComponents/Hero/Hero.module.css";
import HotOffersClient from "@/components/HomeComponents/HotOffersClient/HotOffersClient";

export default function Home() {
  return (
    <>
      <section className={`section ${css.heroSection}`} id="home">
        <div className="container">
          <Hero />
        </div>
      </section>
      <section className={`section ${css.hotOffersSection}`} id="hot-offers">
        <div className="container">
          <HotOffersClient />
        </div>
      </section>
    </>
  );
}
