import { Hero } from "@/components/sections/hero";
import { Manifest } from "@/components/sections/manifest";
import { Collections } from "@/components/sections/collections";
import { Craft } from "@/components/sections/craft";
import { Comparison } from "@/components/sections/comparison";
import { Pricing } from "@/components/sections/pricing";
import { Trade } from "@/components/sections/trade";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifest />
      <Collections />
      <Craft />
      <Comparison />
      <Pricing />
      <Trade />
      <FinalCta />
    </>
  );
}
