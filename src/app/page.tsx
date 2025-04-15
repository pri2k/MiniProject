import HowToUse from "@/components/how-use/HowToUse";
import LandingPage from "@/components/LandingPage";
import FrequentlyAskedQ from "@/components/faq/FrequentlyAskedQ";
import VolunteerCall from "@/components/VolunteerCall"
import Questionnaire from "@/components/Questionnaire";

export default function Home() {
  return (
    <div className="">
      <LandingPage />
      <Questionnaire/>
      <HowToUse />
      <VolunteerCall/>
      <FrequentlyAskedQ />
    </div>
  );
}
