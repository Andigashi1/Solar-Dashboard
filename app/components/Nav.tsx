"use client";

import { EllipsisVertical, X } from "lucide-react";
import { useEffect, useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false)

  const links = [
    { label: "Home", href: "#home" },
    { label: "Explore", href: "#explore" },
    { label: "Today's Image", href: "#apod" },
  ];

  //scroll effect
  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20)
  }
  window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
}, [])

  //close the menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
    ${scrolled
      ? "backdrop-blur-md bg-bg/60 border-b border-border"
      : "bg-transparent border-b border-transparent"
    }`}>
      <div className="relative pt-4">
        {/* Navbar bar */}
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="font-display font-bold tracking-widest text-md md:text-lg uppercase">
            Solar <span className="text-violet">Dashboard</span>
          </h1>
          {/* Desktop links */}
          <nav className="hidden md:flex gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm tracking-widest uppercase text-text-secondary
                  hover:text-text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
          {/* Hamburger */}
          <button className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <EllipsisVertical />}
          </button>
        </div>
        {/* Mobile menu — absolute relative to the header */}
        {isOpen && (
          <div className="md:hidden absolute top-0 right-0 w-3/4 h-screen bg-surface flex flex-col gap-4 pt-20 px-6 text-right">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body tracking-widest uppercase text-text-secondary
                  hover:text-text-primary transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Nav;
