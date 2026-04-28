import { Hero } from "@/components/sections/hero";
import { WhatIsIt } from "@/components/sections/what-is-it";
import { Manifest } from "@/components/sections/manifest";
import { Collections } from "@/components/sections/collections";
import { Craft } from "@/components/sections/craft";
import { Comparison } from "@/components/sections/comparison";
import { Pricing } from "@/components/sections/pricing";
import { HomeStats } from "@/components/sections/home-stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Trade } from "@/components/sections/trade";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIsIt />
      <Manifest />
      <Collections />
      <Craft />
      <Comparison />
      <Pricing />
      <HomeStats />
      <Testimonials />
      <Trade />
      <FinalCta />
    </>
  );
}
