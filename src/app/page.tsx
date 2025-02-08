import HowToUse from "@/components/how-use/HowToUse";
import LandingPage from "@/components/LandingPage";
import FrequentlyAskedQ from "@/components/faq/FrequentlyAskedQ";

export default function Home() {
  return (
    <div className="">
      <LandingPage/>
      <HowToUse/>
      <FrequentlyAskedQ/>
    </div>
  );
}
