import HowToUse from "@/components/how-use/HowToUse";
import LandingPage from "@/components/LandingPage";
import FrequentlyAskedQ from "@/components/faq/FrequentlyAskedQ";
import VolunteerCall from "@/components/VolunteerCall"

export default function Home() {
  return (
    <div className="">
      <LandingPage />
      <HowToUse />
      <VolunteerCall/>
      <FrequentlyAskedQ />
    </div>
  );
}
