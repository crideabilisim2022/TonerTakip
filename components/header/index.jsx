"use client";
import Link from "next/link";
import "./style.css";

import { useEffect, useState } from "react";
import {
  AboutIcon,
  CommunicationIcon,
  HomeIcon,
  InstagramIcon,
  LinkedinIcon,
  ServicesIcon,
  WhatsappIcon,
} from "@/helpers/icons";
import { createClient } from "@/utils/supabase/client";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUser();
  }, [user]);

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = "/";
    }
  };
  return (
    <header>
      <Link className="logo" href={"/"}>
        <h3>Cridea</h3>
      </Link>
      <button className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </button>
      <ul className="nav">
        <Link href={"/"}>
          <HomeIcon />
          <li>Ansayfa</li>
        </Link>
        <Link href={"/hizmetlerimiz"}>
          <ServicesIcon />
          <li>Hizmetlerimiz</li>
        </Link>
        <Link href={"/hakkimizda"}>
          <AboutIcon />
          <li>Hakkımızda</li>
        </Link>
        <Link href={"/iletisim"}>
          <CommunicationIcon />
          <li>İletişim</li>
        </Link>

        {user ? (
          <div className="userMenu">
            <p className="userHover">{user?.user_metadata?.firstName}</p>
            <div className="dropdownMenu">
              <form action={handleLogout}>
                <button>Logout</button>
              </form>
            </div>
          </div>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </ul>

      <ul className="socialIcon">
        <li>
          <InstagramIcon />
        </li>

        <Link
          href={"https://www.linkedin.com/in/cridea-bili%C5%9Fim-b98249319/"}
        >
          <li>
            <LinkedinIcon />
          </li>
        </Link>

        <li>
          <WhatsappIcon />
        </li>
      </ul>
    </header>
  );
}
