// 'use client';

// import Link from 'next/link';
// import FadeInOnScroll from "./FadeInOnScroll";

// export default function Questionnaire() {
//   return (
//     <FadeInOnScroll>
//       <div className="flex justify-center py-5 my-20 bg-yellow-50">
//         <div className="bg-yellow-100 p-9 rounded-2xl shadow-xl max-w-lg text-center">
//           <h2 className="text-2xl font-bold text-yellow-800 mb-3">Ready to Explore Your Mind?</h2>
//           <p className="text-2l mb-3">Get to know yourself a bit more!</p>
//           <Link href="/Questionnaire">
//             <button className="bgMain hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-full transition">
//               Take the Questionnaire
//             </button>
//           </Link>
//         </div>
//       </div>
//     </FadeInOnScroll>
//   );
// }


'use client';

import Link from 'next/link';

export default function ActionBox({ title, subtext, href, buttonLabel = "Start" }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-yellow-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{subtext}</p>
      </div>
      <div className="flex justify-center pt-4">
        <Link href={href}>
          <button className="bgMain  hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-full transition">
            {buttonLabel}
          </button>
        </Link>
      </div>
    </div>
  );
}
