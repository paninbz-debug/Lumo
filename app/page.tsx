import { Hero } from "@/components/sections/hero";
import { AestheticsGallery } from "@/components/sections/aesthetics-gallery";
import { WhatIsIt } from "@/components/sections/what-is-it";
import { Manifest } from "@/components/sections/manifest";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Comparison } from "@/components/sections/comparison";
import { Pricing } from "@/components/sections/pricing";
import { ProcessTease } from "@/components/sections/process-tease";
import { MaterialsTeaser } from "@/components/sections/materials-teaser";
import { HomeStats } from "@/components/sections/home-stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Trade } from "@/components/sections/trade";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* image-led: 5 collections как стена сразу под Hero */}
      <AestheticsGallery />
      <WhatIsIt />
      <Manifest />
      {/* image-led: 3 кейса с большими фото 60/40 */}
      <FeaturedProjects />
      <Comparison />
      <Pricing />
      {/* image-led: 5 этапов ремесла визуально */}
      <ProcessTease />
      {/* image-led: 5 металлов AuraMetal */}
      <MaterialsTeaser />
      <HomeStats />
      <Testimonials />
      <Trade />
      <FinalCta />
    </>
  );
}
