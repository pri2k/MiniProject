import Link from "next/link";
import problemCategories from "@/data/groups";

export default function TalkToVolunteer() {
    return (
        <div className="p-20 mt-20 pt-20">
          <h1 className="text-3xl font-bold mb-6 text-center">Support Groups</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {problemCategories.map((problem) => (
              <Link 
                key={problem.slug} 
                href={problem.link} 
                className="p-2 border rounded-lg bg-[#D7A529] transition-all duration-300 hover:-translate-y-2"
              >
                <div className="bg-white">
                    <img 
                      src={problem.image} 
                      alt={problem.title} 
                      className="w-full h-40 object-cover rounded-md p-2"
                    />
                    <h3 className="text-xl font-bold p-2">{problem.title}</h3>
                    <p className="text-gray-600 p-2">{problem.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
}
