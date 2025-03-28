import Card from "@/components/Card";
import Link from "next/link";
import problemCategories from "@/data/groups";

export default function TalkToPerson() {
    return (
        <div className="p-6 max-w-5xl mx-auto mt-20 pt-20">
          <h1 className="text-3xl font-bold mb-6 text-center">Support Groups</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemCategories.map((problem) => (
              <Link 
                key={problem.slug} 
                href={problem.link} 
                className="p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white"
              >
                <Card>
                    <img 
                      src={problem.image} 
                      alt={problem.title} 
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-xl font-bold">{problem.title}</h3>
                    <p className="text-gray-600 mt-2">{problem.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      );
}
