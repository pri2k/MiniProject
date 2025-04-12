import Volunteer from '../../../models/volunteer';
import mongoose from 'mongoose';
import Card from '@/components/Card';
import problemCategories from "../../../data/groups";

async function getVolunteersByProblem(problemTitle) {
    await mongoose.connect(process.env.MONGO_URI)
    const volunteers = await Volunteer.find({ problem: { $in: [problemTitle] } })
    return volunteers;
}

export default async function VolunteersPage({ params }) {
    const { problemSlug } = await params;

    const matchedCategory = problemCategories.find(cat => cat.slug === problemSlug)
    const problemTitle = matchedCategory?.title || problemSlug.replace(/-/g, ' ')

    const volunteers = await getVolunteersByProblem(problemTitle)

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 mt-[10em] text-center">
        <h1 className="text-2xl font-bold mb-6 capitalize">
            Volunteers for: {problemTitle}
        </h1>
        {volunteers.length === 0 ? (
            <p>No volunteers found for this issue.</p>
        ) : (
            <div className="grid gap-5 sm:grid-cols-2">
            {volunteers.map((v) => (
                <Card key={v._id}>
                <div className="p-4 flex gap-4 items-start">
                    <img
                        src={v.image}
                        alt={v.name}
                        width={80}
                        height={80}
                        className="rounded-full object-cover"
                    />
                    <div>
                    <h2 className="text-xl font-semibold">{v.name}</h2>
                    <p className="text-sm text-gray-600 mb-2">{v.description}</p>
                    <p className="text-sm text-gray-500">
                        <strong>Age:</strong> {v.age} | <strong>Chats:</strong> {v.chatCnt}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        <strong>Problems:</strong> {v.problem.join(', ')}
                    </p>
                    </div>
                </div>
                </Card>
            ))}
            </div>
        )}
        </div>
    )
}
