import problemCategories from "@/data/groups";
import Volunteer from "../../../components/Volunteer";

export default function GroupPage({ params }) {
  const problem = problemCategories.find(p => p.slug === params.problemSlug);

  if (!problem) {
    return <h1 className="text-center text-2xl text-red-500">Group Not Found</h1>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto mt-20 pt-20">
      <h1 className="text-4xl font-bold">{problem.title}</h1>
      <p className="text-gray-700 mt-41">{problem.description}</p>
      <Volunteer/>
    </div>
  );
}
