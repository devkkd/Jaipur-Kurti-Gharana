import Achievements from "@/components/Achievements";
import ArtisanExcellence from "@/components/ArtisanExcellence";
import AvantaBanner from "@/components/AvantaBanner";
import CraftedHeritage from "@/components/CraftedHeritage";
import TheSeasons from "@/components/TheSeasons";
import CommitmentSection from "@/components/CommitmentSection";
import ContactUs from "@/components/ContactUs";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import CuratedArrivals from "@/components/CuratedArrivals";
import ExploreMore from "@/components/ExploreMore";
import Signature from "@/components/Signature";
import FAQ from "@/components/FAQ";
import HeroCarousel from "@/components/HeroCarousel";
import InstagramSection from "@/components/InstagramSection";
import Manufacturing from "@/components/Manufacturing";
import PartnershipSection from "@/components/PartnershipSection";
import PremiumCollections from "@/components/PremiumCollections";
import RefinedSelection from "@/components/RefinedSelection";
import TrustedCities from "@/components/TrustedCities";
import WholesaleForm from "@/components/WholesaleForm";
import Slider from "@/components/Slider";
import ExclusiveCollections from "@/components/ExclusiveCollections";
import SignatureCraft from "@/components/SignatureCraft";
import Legacy from "@/components/Legacy";

export default function Home() {
   return (
      <>
         <HeroCarousel />
         <Slider />
         <TrustedCities />
         <Manufacturing />
         <ExclusiveCollections />
         {/* <PremiumCollections/> */}
         <CraftedHeritage />
         <CuratedArrivals />
         <SignatureCraft />
         <Legacy />
         {/* <ArtisanExcellence /> */}
         <TheSeasons />
         {/* <AvantaBanner /> */}
         {/* <RefinedSelection /> */}
         <PartnershipSection />
         <ExploreMore />
         <Signature />
         <Achievements />
         <InstagramSection />
         <CommitmentSection />
         <WholesaleForm />
         <FAQ />
         <ContactUs />
         <CraftsmanshipSection />
      </>
   );
}
