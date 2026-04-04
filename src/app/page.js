import CraftedHeritage from "@/components/CraftedHeritage";
import TheSeasons from "@/components/TheSeasons";
import CommitmentSection from "@/components/CommitmentSection";
import ContactUs from "@/components/ContactUs";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import CuratedArrivals from "@/components/CuratedArrivals";
import Signature from "@/components/Signature";
import FAQ from "@/components/FAQ";
import HeroCarousel from "@/components/HeroCarousel";
import InstagramSection from "@/components/InstagramSection";
import Manufacturing from "@/components/Manufacturing";
import TrustedCities from "@/components/TrustedCities";
import WholesaleForm from "@/components/WholesaleForm";
import Slider from "@/components/Slider";
import ExclusiveCollections from "@/components/ExclusiveCollections";
import Legacy from "@/components/Legacy";

export default function Home() {
   return (
      <>
         <HeroCarousel />
         <Slider />
         <Manufacturing />


         <ExclusiveCollections />
         <CuratedArrivals />
         <TheSeasons />
         <Legacy />

         <CraftedHeritage />

         {/* <SignatureCraft /> */}

         {/* <ArtisanExcellence /> */}

         {/* <AvantaBanner /> */}
         {/* <RefinedSelection /> */}
         {/* <PartnershipSection /> */}
         {/* <ExploreMore /> */}
         <Signature />
         {/* <Achievements /> */}
         <InstagramSection />
         {/* <CommitmentSection /> */}
         <WholesaleForm />
         {/* <FAQ /> */}
         <TrustedCities />
         <ContactUs />
         {/* <CraftsmanshipSection /> */}
      </>
   );
}
