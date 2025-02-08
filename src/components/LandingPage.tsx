import Link from "next/link";

export default function LandingPage() {
    return (
      <div className="landing_page">
        <div className="landing_page_bg">
          <div className="landing_page_heading">Hope begins with a conversation</div>
          {/* for small screens remove the videos just add two boxes saying talk to this and that */}
          <div className="image_container">
            <Link href="/talkToPerson" className="people">
              <video autoPlay loop muted playsInline className="listener-video">
                  <source src="/videos/hiPerson.webm" type="video/mp4" />
              </video> 
              <div className="talk">
                <img src="/images/talktoPeople.png" alt="" />
              </div>
            </Link>
            <Link href="/talkToChatbot" className="robot">
            <div className="talk">
                <img src="/images/talktoChatbot.png" alt="" />
              </div>
              <video autoPlay loop muted playsInline className="listener-video">
                <source src="/videos/hiChatbot.webm" type="video/mp4" />
              </video>            
            </Link>
          </div>
        </div>
      </div>
    );
  }
  