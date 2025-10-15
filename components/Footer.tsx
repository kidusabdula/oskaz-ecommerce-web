// components/footer.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  ArrowUp,
  Package,
  Shield,
  Users
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  if (!mounted) return null;

  const footerLinks = {
    products: [
      { name: "Kiosk Systems", href: "/products/kiosk" },
      { name: "Power Solutions", href: "/products/power" },
      { name: "Digital Displays", href: "/products/display" },
      { name: "Custom Solutions", href: "/products/custom" }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" }
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Documentation", href: "/docs" },
      { name: "Contact Us", href: "/contact" },
      { name: "Warranty", href: "/warranty" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Refund Policy", href: "/refund" }
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/hussen-yesuf-9a261a216/", label: "LinkedIn" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Send className="h-5 w-5" />, href: "#", label: "Telegram" }
  ];

  const contactInfo = [
    { icon: <Mail className="h-4 w-4" />, text: "info@oskaz.com", href: "mailto:info@oskaz.com" },
    { icon: <Phone className="h-4 w-4" />, text: "+251 911 204 731", href: "tel:+251911204731" },
    { icon: <MapPin className="h-4 w-4" />, text: "Bole, Addis Ababa, Ethiopia" }
  ];

  return (
    <footer className={cn(
      "relative border-t transition-colors duration-500",
      isDarkMode ? "bg-background border-border" : "bg-muted/30 border-gray-200"
    )}>
      {/* Newsletter Section */}
      <div className={cn(
        "py-12 border-b",
        isDarkMode ? "border-border" : "border-gray-200"
      )}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="px-3 py-1 text-xs font-medium rounded-full mb-4">
              <Mail className="w-3 h-3 mr-1 text-primary" />
              Newsletter
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with Our Latest Innovations
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new products, exclusive offers, and technology insights.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" className="group rounded-full">
                Subscribe
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center mb-4">
                <div className="text-2xl font-semibold text-foreground tracking-wide flex items-center">
                  <span className="text-4xl font-black mr-1 leading-none">ኦ</span>
                  <span className="font-bold tracking-wider">SKAZ</span>
                  <span className="text-sm font-normal ml-1">®</span>
                </div>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Empowering businesses with cutting-edge technology solutions that drive innovation and growth across industries.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 mb-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center text-sm text-muted-foreground">
                    {info.icon}
                    {"href" in info && info.href ? (
                      <a href={info.href} className="ml-2 hover:text-primary" aria-label={info.text}>
                        {info.text}
                      </a>
                    ) : (
                      <span className="ml-2">{info.text}</span>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                      {social.icon}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center">
                <Package className="h-4 w-4 mr-2 text-primary" />
                Products
              </h3>
              <ul className="space-y-2">
                {footerLinks.products.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center">
                <Users className="h-4 w-4 mr-2 text-primary" />
                Company
              </h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-primary" />
                Support
              </h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={cn(
        "py-6 border-t",
        isDarkMode ? "border-border" : "border-gray-200"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} Oskaz Import®. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </footer>
  );
};

export default Footer;