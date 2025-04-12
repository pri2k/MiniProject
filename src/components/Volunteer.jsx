import Card from "@/components/Card";

export default function VolunteerList({ volunteers }) {
    if (volunteers.length === 0) {
        return <p className="text-gray-500">No volunteers available for this group.</p>;
    }

    return (
        <div className="space-y-4">
        {volunteers.map((v) => (
            <Card key={v._id}>
            <div className="p-4 flex gap-4 items-center">
                <img
                src={v.image}
                alt={v.name}
                className="w-20 h-20 object-cover rounded-full border border-gray-300"
                />
                <div>
                <h2 className="text-xl font-bold">{v.name}, {v.age}</h2>
                <p className="text-gray-600">{v.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                    Problems: {v.problem.join(", ")} | Chats: {v.chatCnt}
                </p>
                </div>
            </div>
            </Card>
        ))}
        </div>
    );
}
