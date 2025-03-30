// import Link from "next/link";
import Card from "@/components/Card"; 

export default function Volunteer() {
    return (
        <div>
            <Card>
                <div className="">
                    <h1 className="">John Doe</h1>
                    <div className="">
                        <h3 className="">I am happy</h3>
                        <p className="">duniya bhar ke dukh</p>
                        <p className="">baat kr skti hu</p>
                    </div>
                </div>
            </Card>
        </div>
    )
}


{/* // {supportGroups.map((group) => (
//     <Link key={group.slug} href={`/groups/${group.slug}`} className="group-card">
//     <h3 className="group-title">{group.title}</h3>
//     <p className="group-description">{group.description}</p>
//     <p className="group-start">Starts: {group.startDate}</p>
//     </Link>
// ))} */}



{/* <Card>
<div className="groups-container">
    <h1 className="title">John Doe</h1>
    <div className="groups-grid">
        <Link key={group.slug} href={`/groups/${group.slug}`} className="group-card">
            <h3 className="group-title">I am happy</h3>
            <p className="group-description">duniya bhar ke dukh</p>
            <p className="group-start">baat kr skti hu</p>
        </Link>
    </div>
</div>
</Card> */}