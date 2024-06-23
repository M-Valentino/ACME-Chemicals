import { MainWrapper } from "@/components/MainWrapper";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const productName = router.query.slug;
  return (
    <MainWrapper title={productName as string}>
      <h1 className="pt-12 text-6xl text-primary font-extrabold text-center">
        {productName}
      </h1>
      <p>I will be adding an add to cart functionality and more on this page.</p>
    </MainWrapper>
  );
}
