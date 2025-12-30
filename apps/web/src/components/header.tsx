"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

type ExternalLink = {
  to: string;
  label: string;
  external: true;
};

type InternalLink = {
  to: "/" | "/appointments" | "/employees" | "#layanan" | "#kontak";
  label: string;
  external?: false;
};

type LinkItem = ExternalLink | InternalLink;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links: LinkItem[] = [
    { to: "/", label: "Beranda" },
    { to: "/appointments", label: "Booking" },
    { to: "/employees", label: "Karyawan" },
    { to: "#layanan", label: "Layanan Bengkel" },
    { to: "https://qasir.biz/manujujaya", label: "Produk", external: true },
    { to: "#kontak", label: "Kontak" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto flex flex-row items-center justify-between px-5 py-[0.9375rem]">
        <Link href="/" className="text-xl font-bold hover:text-primary transition-colors" onClick={handleLinkClick}>
          Manuju Jaya
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-[1.875rem] text-sm">
          {links.map((link) => {
            return link.external ? (
              <a
                key={link.to}
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors font-medium relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ) : (
              <Link
                key={link.to}
                href={link.to}
                onClick={handleLinkClick}
                className="hover:text-primary transition-colors font-medium relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col items-center justify-center gap-1.5 w-10 h-10 rounded-lg hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden border-t bg-background/95 backdrop-blur-sm overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <nav className="container mx-auto px-5 py-4 flex flex-col gap-3">
          {links.map((link) => {
            return link.external ? (
              <a
                key={link.to}
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="text-sm hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-muted/30 font-medium"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.to}
                href={link.to}
                onClick={handleLinkClick}
                className="text-sm hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-muted/30 font-medium"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
