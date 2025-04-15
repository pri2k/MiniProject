import Link from "next/link";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function VolunteerCall() {
  return (
    <FadeInOnScroll>
        <div className="flex flex-col lg:flex-row items-center justify-center p-10 bg-yellow-100 my-20">
        <div className="max-w-lg text-center lg:text-left">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Become a Volunteer - Be the Light in Someone's Darkest Moments
                </h1>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    Every day, countless people struggle with loneliness, stress, and emotional pain, feeling like they have no one to turn to. As a volunteer, you have the power to change that. By offering your time, compassion, and a listening ear, you can make a real difference in someone's life. You don't need to be an expert—just someone willing to care, support, and share hope. Join us in creating a world where no one has to face their struggles alone.
                </p>
                <Link href="/volunteer-register">
                    <button
                        className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none transition-transform duration-300 bg-yellow-500 text-white font-semibold hover:bg-yellow-600 hover:-translate-y-2 shadow-md hover:shadow-lg"
                    >
                        Register as Volunteer
                    </button>
                </Link>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-12 border-4 border-[#D7A529] p-2 rounded-lg max-w-[350px]">
                <img
                    src="https://i.pinimg.com/736x/70/56/86/705686e9f3c0a31dc3e77eb5ef6f8c25.jpg"
                    alt="Volunteer Support"
                    className="shadow-lg w-full h-auto object-cover rounded-md"
                />
            </div>
    </div>
   </FadeInOnScroll>
  );
}
