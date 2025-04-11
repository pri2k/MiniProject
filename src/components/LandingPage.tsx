import Link from "next/link";

export default function LandingPage() {
    return (
      <div className="landing_page">
        <div className="landing_page_bg">
          <div className="landing_page_heading">Hope begins with a conversation</div>
          <div className="image_container">
            <Link href="/talkToVolunteers" className="talk_option">
              <div className="talk_text">Talk to Volunteers</div>
            </Link>
            <Link href="/talkToChatbot" className="talk_option">
              <div className="talk_text">Talk to Brighter Beyond Bot</div>
            </Link>
          </div>
        </div>
      </div>
    );
}
