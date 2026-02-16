import Achievements from "@/components/Achievements";
import ArtisanExcellence from "@/components/ArtisanExcellence";
import AvantaBanner from "@/components/AvantaBanner";
import AvantaLanding from "@/components/AvantaLanding";
import BestSelling from "@/components/BestSelling";
import CommitmentSection from "@/components/CommitmentSection";
import ContactUs from "@/components/ContactUs";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import CuratedArrivals from "@/components/CuratedArrivals";
import DiscoverMore from "@/components/DiscoverMore";
import Embrace from "@/components/Embrace";
import FAQ from "@/components/FAQ";
import HeroCarousel from "@/components/HeroCarousel";
import InstagramSection from "@/components/InstagramSection";
import Manufacturing from "@/components/Manufacturing";
import PartnershipSection from "@/components/PartnershipSection";
import PremiumCollections from "@/components/PremiumCollections";
import RefinedSelection from "@/components/RefinedSelection";
import TrustedCities from "@/components/TrustedCities";
import WholesaleForm from "@/components/WholesaleForm";

export default function Home() {
  return (
   <>
   <HeroCarousel/>
   <TrustedCities/>
   <Manufacturing/>
   <PremiumCollections/>
   <CuratedArrivals/>
   <AvantaLanding/>
   <ArtisanExcellence/>
   <BestSelling/>
   <AvantaBanner/>
   <RefinedSelection/>
   <PartnershipSection/>
   <DiscoverMore/>
   <Embrace/>
   <CommitmentSection/>
   <Achievements/>
   <InstagramSection/>
   <WholesaleForm/>
   <FAQ/>
   <ContactUs/>
   <CraftsmanshipSection/>
   </>
  );
}
