"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const [user, setUser] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    const getUserDetails = async () => {
      const res = await axios.get("/api/users/me");
      console.log("res.data", res.data.data.username);
      setUser(res.data.data.username);
    };
    getUserDetails();
  }, []);

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    router.push(href); 
  };

  return (
    <nav className="navbar">
      <div className="navbar_div">
        <img src="/images/logo.png" className="logo_navbar" alt="logo" />

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <MenuIcon />
        </div>

        <div className={`navbar_options ${menuOpen ? "open" : ""}`}>
          <Link href="/" onClick={() => handleLinkClick("/")}>Home</Link>
          <Link href="/about" onClick={() => handleLinkClick("/about")}>About</Link>
          <Link href="/talkToPerson">Groups</Link>
          <Link href="/talkToChatbot">Bot</Link>
          {user ? (
            <div className="profile">
              <Link href="/profile" onClick={() => handleLinkClick("/profile")}>
                {user.charAt(0).toUpperCase()}
              </Link>
            </div>
          ) : (
            <Link href="/login" className="login" onClick={() => handleLinkClick("/login")}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
