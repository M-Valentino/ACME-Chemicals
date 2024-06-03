import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <TopNav />
      <Hero/>
      <FeaturedProducts/>
      <Testimonials/>
    </>
  );
}
