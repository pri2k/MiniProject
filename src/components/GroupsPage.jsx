import Link from "next/link";
import supportGroups from "@/data/groups";

export default function GroupsPage() {
  return (
    <div className="groups-container">
      <h1 className="title">oupport Groups</h1>
      <div className="groups-grid">
        {supportGroups.map((group) => (
          <Link key={group.slug} href={`/groups/${group.slug}`} className="group-card">
            <h3 className="group-title">{group.title}</h3>
            <p className="group-description">{group.description}</p>
            <p className="group-start">Starts: {group.startDate}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
