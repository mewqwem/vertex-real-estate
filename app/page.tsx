import Catalog from "@/components/Catalog/Catalog";
import Hero from "@/components/Hero/Hero";

export default function Home() {
  return (
    <>
      <section className="section" id="home">
        <Hero />
      </section>
      <section className="section" id="catalog">
        <Catalog />
      </section>
    </>
  );
}
