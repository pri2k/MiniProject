'use client';

import FadeInOnScroll from "./FadeInOnScroll";
import ActionBox from "./ActionBox";

export default function RoadToHappiness() {
  const options = [
    {
      title: 'Take the questionnaire',
      subtext: 'Discover what’s going on inside',
      href: '/Questionnaire',
    },
    {
      title: 'Talk to chatbot',
      subtext: 'Speak your mind in private',
      href: '/chatbot',
    },
    {
      title: 'Talk to volunteer',
      subtext: 'Real people, real care',
      href: '/volunteers',
    },
    {
      title: 'Take the professional helper',
      subtext: 'Expert support, one step away',
      href: '/professionals',
    },
    {
      title: 'I am happy',
      subtext: 'That’s beautiful — keep shining',
      href: '/happy',
    },
  ];

  return (
    <FadeInOnScroll>
      <div className="flex justify-center bg-yellow-50 py-12 px-4">
        <div className="bg-yellow-100 p-8 rounded-2xl shadow-xl w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-yellow-800 text-center mb-10">
            Road to Happiness Starts Here
          </h2>

          <div className="flex space-between flex-col md:flex-row md:space-x-8">
            <div className="space-y-8">
                {options.map((option, index) => (
                <div key={index} className={index % 2 !== 0 ? "md:flex-row-reverse" : ""}>
                    <ActionBox {...option} />
                </div>
                ))}
            </div>
            <div className="space-y-8">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem libero expedita placeat dicta neque impedit, illo, magni adipisci officiis doloribus distinctio, molestiae iste repellat? Exercitationem.</p>
            </div>
          </div>


        </div>
      </div>
    </FadeInOnScroll>
  );
}
