"use client";
import Link from "next/link";
import "./style.css";
import {
  AboutIcon,
  CommunicationIcon,
  HomeIcon,
  InstagramIcon,
  LinkedinIcon,
  ServicesIcon,
  WhatsappIcon,
} from "@/helpers/icons";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
