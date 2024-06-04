import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Testimonials } from "@/components/home/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <FeaturedProducts />
        <Testimonials />
        <Footer/>
      </main>
    </>
  );
}
