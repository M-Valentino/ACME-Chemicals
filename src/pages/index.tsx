import { MainWrapper } from "@/components/MainWrapper";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <MainWrapper>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
    </MainWrapper>
  );
}
