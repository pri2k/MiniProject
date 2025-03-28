import supportGroups from "@/data/groups";

export default function GroupPage({ params }) {
  const group = supportGroups.find(g => g.slug === params.groupSlug);

  if (!group) {
    return <h1 className="text-center text-2xl text-red-500">Group Not Found</h1>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto mt-20 pt-20">
      <h1 className="text-4xl font-bold">{group.title}</h1>
      <p className="text-gray-700 mt-4">{group.description}</p>
      <p className="mt-6 font-semibold">Starts: {group.startDate}</p>
    </div>
  );
}
