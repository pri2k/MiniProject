"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import problemCategories from "@/data/groups";
import VolunteerList from "@/components/Volunteer";

export default function GroupPage() {
    const params = useParams();
    const [volunteers, setVolunteers] = useState([]);

    const problemSlug = params.problemSlug;
    const problem = problemCategories.find(p => p.slug === problemSlug);

    useEffect(() => {
        const fetchVolunteers = async () => {
            const res = await fetch(`/api/volunteer/${problemSlug}`);
            const data = await res.json();
            if (data.success) {
                setVolunteers(data.volunteers);
            }
        };
        if (problemSlug) fetchVolunteers();
    }, [problemSlug]);

    if (!problem) {
        return <h1 className="text-center text-2xl text-red-500">Group Not Found</h1>;
    }

    return (
        <div className="p-6 max-w-3xl mx-auto mt-20 pt-20">
            <h1 className="text-4xl font-bold">{problem.title}</h1>
            <p className="text-gray-700 mb-6">{problem.description}</p>
            <VolunteerList volunteers={volunteers} />
        </div>
    );
}
