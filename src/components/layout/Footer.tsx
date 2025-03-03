import React from "react";
import { cn } from "../../lib/utils";
import { Instagram, Facebook, Twitter, Mail, Github } from "lucide-react";
import { Button } from "../ui/button";

interface FooterProps {
  copyrightText?: string;
  socialLinks?: {
    platform: "instagram" | "facebook" | "twitter" | "email" | "github";
    url: string;
  }[];
  navLinks?: {
    label: string;
    href: string;
  }[];
}

const Footer = ({
  copyrightText = "© 2023 Photography Portfolio. All rights reserved.",
  socialLinks = [
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "twitter", url: "https://twitter.com" },
    { platform: "email", url: "mailto:contact@example.com" },
  ],
  navLinks = [
    { label: "Gallery", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Terms", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
}: FooterProps) => {
  const socialIcons = {
    instagram: <Instagram className="h-5 w-5" />,
    facebook: <Facebook className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />,
    email: <Mail className="h-5 w-5" />,
    github: <Github className="h-5 w-5" />,
  };

  return (
    <footer className="w-full bg-gray-900 py-6 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="text-sm">{copyrightText}</div>

          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
                aria-label={`Visit our ${link.platform} page`}
              >
                {socialIcons[link.platform]}
              </a>
            ))}
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 text-sm">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
