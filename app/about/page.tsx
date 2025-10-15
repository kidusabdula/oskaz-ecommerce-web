"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Globe, 
  Users, 
  Award, 
  TrendingUp, 
  Shield, 
  Heart, 
  Code, 
  X, 
  MapPin,
  Copy,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  type Certificate = {
    id: number;
    title: string;
    organization: string;
    image: string;
    description: string;
  };
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  
  // Create refs for each section for individual animations
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const certificatesRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  const [inViewSections, setInViewSections] = useState({
    hero: false,
    stats: false,
    story: false,
    values: false,
    team: false,
    testimonials: false,
    certificates: false,
    partners: false
  });

  useEffect(() => {
    setMounted(true);

    const observers: IntersectionObserver[] = [];

    // Create observers for each section with smoother threshold
    const sections = [
      { ref: heroRef, key: 'hero' },
      { ref: statsRef, key: 'stats' },
      { ref: storyRef, key: 'story' },
      { ref: valuesRef, key: 'values' },
      { ref: teamRef, key: 'team' },
      { ref: testimonialsRef, key: 'testimonials' },
      { ref: certificatesRef, key: 'certificates' },
      { ref: partnersRef, key: 'partners' }
    ];

    sections.forEach(({ ref, key }) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInViewSections(prev => ({ ...prev, [key]: true }));
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
      );

      if (ref.current) {
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const copyToClipboard = (text: string, type: "address" | "link") => {
    navigator.clipboard.writeText(text);
    if (type === "address") {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!mounted) return null;

  // Certificate data with actual image paths
  const certificates = [
    {
      id: 1,
      title: "Africa Centre of Excellence for Water Management",
      organization: "Addis Ababa University",
      image: "africa-center-excellence.png",
      description: "Recognition for supply of Smart Board technology and equipment"
    },
    {
      id: 2,
      title: "City Government of Addis Ababa",
      organization: "Municipal Authority",
      image: "city-government-addis-ababa.png",
      description: "Certificate for successful completion of engineering items and computer accessories supply"
    },
    {
      id: 3,
      title: "Ethiopian Public Health Institute",
      organization: "Ministry of Health",
      image: "ethiopian-health-institution.png",
      description: "Recognition for supply and installation of Digital Signage Systems and Interactive Touch Board"
    },
    {
      id: 4,
      title: "Federal Police Commission",
      organization: "Federal Democratic Republic of Ethiopia",
      image: "federal-police-commission.png",
      description: "Certificate for supply of Cisco ASA 5585-S10-K9 Firewall and TransceiverSFP+"
    },
    {
      id: 5,
      title: "Mizan Tepi University",
      organization: "Higher Education Institution",
      image: "mizan-tepi-university.png",
      description: "Recognition for supply of Core Switch, Server Computer, and optical fiber equipment"
    }
  ];

  const stats = [
    { icon: Globe, label: "Organizations Served", value: "100+" },
    { icon: Users, label: "Satisfied Clients", value: "500+" },
    { icon: Award, label: "Years Experience", value: "17" },
    { icon: TrendingUp, label: "Success Rate", value: "95%" }
  ];

  const values = [
    {
      icon: Globe,
      title: "Import & Delivery",
      description: "Import and adapt the latest cutting technologies that empower your organization with innovative solutions and efficient delivery systems."
    },
    {
      icon: Users,
      title: "Tech Consultancy",
      description: "Oskaz Import has rendered consultancy services to public, private, and voluntary organizations, helping them leverage technology for growth."
    },
    {
      icon: Shield,
      title: "Trust & Reliability",
      description: "With 17 years of experience, we build lasting relationships through consistent, reliable service and transparent communication."
    },
    {
      icon: Code,
      title: "Custom Software Solutions",
      description: "Transform your business vision into reality with bespoke software solutions. Our expert developers craft tailored applications that perfectly align with your unique workflows, driving efficiency and competitive advantage in today's digital landscape."
    }
  ];

  const team = [
    {
      name: "Ato. Osman Kedir",
      role: "Chief Executive & Trade Expert",
      image: "/team-1.jpg",
      description: "Seasoned international trade expert with 17+ years of experience in import operations, business development, and strategic partnerships across Horn of Africa"
    },
    {
      name: "Import & Logistics Experts",
      role: "Supply Chain Specialists",
      image: "/team-2.jpg",
      description: "Certified professionals specializing in international logistics, customs clearance, and efficient delivery systems with expertise in technology imports"
    },
    {
      name: "Technology Consultants",
      role: "IT Solutions Experts",
      image: "/team-3.jpg",
      description: "Skilled technology consultants with deep expertise in custom software development, system integration, and digital transformation for organizations"
    }
  ];

  const testimonials = [
    {
      name: "Mr Biruk G/Tsadik",
      role: "Director at Mizan Tepi University",
      testimonial: "Oskaz Import delivered our Smart Board on time and in perfect condition. Their professional service and excellent communication made the process seamless. The quality of the board has greatly enhanced our classroom experience. We highly recommend Oskaz Import for their reliability and commitment to customer satisfaction!"
    },
    {
      name: "Mr. Dereje Derara",
      role: "Director at ECDSWC",
      testimonial: "Oskaz Import provided exceptional service with the delivery, installation, and after-sales support for our 100KVA Upsen UPS. Their team was professional and responsive, ensuring everything ran smoothly. We highly recommend Oskaz Import for their reliability and commitment to customer satisfaction!"
    },
    {
      name: "Dr. Feleke Z",
      role: "GM at African Centre of Excellence",
      testimonial: "Oskaz Import delivered our Smart Digital Signage on time and in perfect condition. Their team's professionalism and support made installation a breeze. The signage has transformed our communication efforts. We highly recommend Oskaz Import for their outstanding service and dedication to customer satisfaction!"
    },
    {
      name: "Eng. Negeda Kebede",
      role: "CEO at ECW",
      testimonial: "Oskaz Import delivered our Smart TV Wall on time and in perfect condition. Their team's professionalism and efficient installation exceeded our expectations. The display has greatly enhanced our visual presentations. We highly recommend Oskaz Import for their exceptional service and commitment to customer satisfaction!"
    },
    {
      name: "Mrs Inas Oumer",
      role: "Manager at Dada Mall",
      testimonial: "Oskaz Import delivered our Smart Kiosk promptly and in excellent condition. Their professional service and seamless installation made all the difference. The kiosk has enhanced our customer engagement significantly. We highly recommend Oskaz Import for their reliability and commitment to outstanding service!"
    },
    {
      name: "Dr. Muluken Adamasu",
      role: "GM at Adama Textile",
      testimonial: "Oskaz Import delivered our Smart Podium promptly and in excellent condition. Their professional service and clear communication made the entire process smooth. The podium has significantly improved our presentations. We highly recommend Oskaz Import for their reliability and dedication to customer satisfaction!"
    }
  ];

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500",
      isDarkMode ? "bg-background" : "bg-gradient-to-br from-slate-50 to-blue-50/30"
    )}>
      {/* Background Elements with Subtle Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          "absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-20 blur-3xl",
          isDarkMode ? "bg-primary" : "bg-blue-400"
        )}></div>
        <div className={cn(
          "absolute top-1/2 -left-40 h-96 w-96 rounded-full opacity-20 blur-3xl",
          isDarkMode ? "bg-purple-500" : "bg-purple-400"
        )}></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-5 dark:opacity-10"></div>
      </div>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-32 pb-20 px-4 md:px-8"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className={cn(
            "space-y-8",
            inViewSections.hero && "animate-fade-in"
          )}>
            <div className="flex items-center justify-center space-x-2">
              <Badge variant="outline" className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple-500/10 to-transparent border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <Sparkles className="w-3 h-3 mr-1 text-primary" />
                Established Since 2007
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              About{" "}
              <span className="text-primary">
                <span className="text-5xl md:text-7xl">ኦ</span>skaz®
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              An Import, Retail and Consultancy firm, sister company of Orchid International General Importer. Empowering organizations with cutting-edge technologies and expert consultancy services since 2007.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" passHref>
                <Button size="lg" className="group rounded-full bg-gradient-to-r from-primary cursor-pointer to-purple-400 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/services" passHref>
                <Button variant="outline" size="lg" className="group rounded-full cursor-pointer border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5 transition-all duration-300 hover:scale-105">
                  Our Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className={cn(
          "relative py-20 px-4 md:px-8",
          isDarkMode ? "bg-muted/30" : "bg-gradient-to-br from-blue-50/50 to-purple-50/30"
        )}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={cn(
                  "text-center",
                  inViewSections.stats && "animate-fade-in-up"
                )}
                style={{ 
                  animationDelay: inViewSections.stats ? `${index * 100}ms` : '0ms'
                }}
              >
                <div className={cn(
                  "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 bg-gradient-to-br from-purple-500/10 to-transparent",
                  isDarkMode ? "bg-primary/20" : "bg-primary/10"
                )}>
                  <stat.icon className={cn(
                    "w-8 h-8 transition-transform duration-500 hover:scale-110",
                    isDarkMode ? "text-primary" : "text-primary"
                  )} />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section 
        ref={storyRef}
        className="relative py-20 px-4 md:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={cn(
              "space-y-6",
              inViewSections.story && "animate-fade-in"
            )}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p className={cn(inViewSections.story && "animate-fade-in-up")}>
                  Established on November 12, 2007 G.C under Ethiopian law with a starting capital of 300,000.00 Birr, Oskaz Import was founded by Ato. Osman Kedir as an Import, Retail and Consultancy firm. As a sister company of Orchid International General Importer, we began with a vision to bridge the gap between cutting-edge technology and Ethiopian businesses.
                </p>
                <p className={cn(inViewSections.story && "animate-fade-in-up")} style={{animationDelay: '100ms'}}>
                  With <strong>17 years of experience</strong>, we have grown from a local startup to a trusted partner for organizations across Ethiopia. Our expertise spans import services, retail operations, and comprehensive consultancy services for public, private, and voluntary organizations, helping them adapt and implement the latest technologies.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="px-4 py-2 text-sm transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-700/30 to-purple-200">
                  Import & Delivery
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-700/30 to-purple-200">
                  Tech Consultancy
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-700/30 to-purple-200">
                  Retail Services
                </Badge>
              </div>
            </div>
            <div className={cn(
              "space-y-6",
              inViewSections.story && "animate-scale-in"
            )}>
              {/* Map Component */}
              <Card className={cn(
                "overflow-hidden transition-all duration-500 hover:shadow-xl",
                isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
              )}>
                <CardContent className="p-0">
                  <div className="h-64 bg-muted/30 relative">
                    {/* Embedded Google Map */}
                    <iframe
                      src="https://www.google.com/maps?q=9.001787774540169,38.76919929544805&hl=en&z=15&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Oskaz Import Location"
                    />
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 bg-gradient-to-r from-purple-500/10 to-transparent">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Our Location</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Location Details */}
              <Card className={cn(
                "transition-all duration-500 hover:shadow-lg",
                isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
              )}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Exact Location
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 transition-all duration-300 hover:bg-muted/70 hover:scale-[1.02]">
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium">Bahar Building</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard('Bahar Building', 'address')}
                        className="flex items-center transition-all duration-300 hover:scale-105 hover:bg-purple-500/10"
                      >
                        {copiedAddress ? (
                          <>
                            <span className="mr-1">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 transition-all duration-300 hover:bg-muted/70 hover:scale-[1.02]">
                      <div>
                        <p className="text-sm text-muted-foreground">Google Maps Link</p>
                        <p className="font-medium text-xs break-all">
                          https://maps.app.goo.gl/egNnzgYLZsf2PkPa8
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard('https://maps.app.goo.gl/egNnzgYLZsf2PkPa8', 'link')}
                        className="flex items-center transition-all duration-300 hover:scale-105 hover:bg-purple-500/10"
                      >
                        {copiedLink ? (
                          <>
                            <span className="mr-1">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        ref={valuesRef}
        className={cn(
          "relative py-20 px-4 md:px-8",
          isDarkMode ? "bg-muted/30" : "bg-gradient-to-br from-purple-50/40 to-pink-50/30"
        )}
      >
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "text-center mb-16",
            inViewSections.values && "animate-fade-in"
          )}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do and shape our relationships with clients and partners.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className={cn(
                  "transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group",
                  inViewSections.values && "animate-fade-in-up",
                  isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
                )}
                style={{ 
                  animationDelay: inViewSections.values ? `${index * 100}ms` : '0ms'
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110 bg-gradient-to-br from-purple-500/10 to-transparent",
                    isDarkMode ? "bg-primary/20" : "bg-primary/10"
                  )}>
                    <value.icon className={cn(
                      "w-8 h-8 transition-transform duration-500 group-hover:scale-110",
                      isDarkMode ? "text-primary" : "text-primary"
                    )} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 transition-colors duration-300 group-hover:text-primary">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={teamRef}
        className="relative py-20 px-4 md:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "text-center mb-16",
            inViewSections.team && "animate-fade-in"
          )}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Meet Our Experts
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our team of seasoned professionals brings specialized expertise in international trade, technology consulting, and business solutions to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className={cn(
                  "text-center group transition-all duration-500 hover:scale-105",
                  inViewSections.team && "animate-fade-in-up"
                )}
                style={{ 
                  animationDelay: inViewSections.team ? `${index * 100}ms` : '0ms'
                }}
              >
                <div className="relative mb-6 mx-auto w-48 h-48">
                  <div className={cn(
                    "w-full h-full rounded-full p-1 transition-all duration-500 group-hover:scale-110 bg-gradient-to-br from-purple-500/10 to-transparent",
                    isDarkMode ? "bg-primary/20" : "bg-primary/10"
                  )}>
                    <div className="w-full h-full bg-card rounded-full flex items-center justify-center">
                      <Users className="w-20 h-20 text-muted-foreground/50 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-primary">
                  {member.name}
                </h3>
                <p className="text-lg text-primary font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section 
        ref={testimonialsRef}
        className={cn(
          "relative py-20 px-4 md:px-8",
          isDarkMode ? "bg-muted/30" : "bg-gradient-to-br from-green-50/40 to-blue-50/30"
        )}
      >
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "text-center mb-16",
            inViewSections.testimonials && "animate-fade-in"
          )}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Client Testimonials
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear what our valued clients say about their experience with Oskaz Import&apos;s professional services and solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={cn(
                  "transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group",
                  inViewSections.testimonials && "animate-fade-in-up",
                  isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
                )}
                style={{ 
                  animationDelay: inViewSections.testimonials ? `${index * 50}ms` : '0ms'
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-500 group-hover:scale-110 bg-gradient-to-br from-purple-500/10 to-transparent",
                      isDarkMode ? "bg-primary/20" : "bg-primary/10"
                    )}>
                      <Users className={cn(
                        "w-6 h-6 transition-transform duration-500 group-hover:scale-110",
                        isDarkMode ? "text-primary" : "text-primary"
                      )} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold transition-colors duration-300 group-hover:text-primary">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-primary font-semibold">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">
                    &ldquo;{testimonial.testimonial}&rdquo;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Goodwill and Recognitions Section */}
      <section 
        ref={certificatesRef}
        className="relative py-20 px-4 md:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "text-center mb-16",
            inViewSections.certificates && "animate-fade-in"
          )}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Goodwill and Recognitions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to excellence has earned us recognition and trust from prestigious organizations across Ethiopia.
            </p>
          </div>

          {/* Certificates Section */}
          <div className={cn(
            "mb-16",
            inViewSections.certificates && "animate-fade-in-up"
          )}>
            <h3 className="text-3xl font-bold mb-8 text-center">
              Official Certificates & Recognition
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {certificates.map((certificate, index) => (
                <div
                  key={certificate.id}
                  className={cn(
                    "group cursor-pointer transition-all duration-500 hover:scale-105",
                    inViewSections.certificates && "animate-fade-in-up"
                  )}
                  style={{ 
                    animationDelay: inViewSections.certificates ? `${(index + 1) * 50}ms` : '0ms'
                  }}
                  onClick={() => setSelectedCertificate(certificate)}
                >
                  <Card className={cn(
                    "overflow-hidden h-full transition-all duration-500 group-hover:shadow-xl",
                    isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
                  )}>
                    <CardContent className="p-4 flex flex-col h-full">
                      <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-muted/30 flex items-center justify-center">
                        {/* Display actual certificate image */}
                        <Image 
                          src={`/${certificate.image}`}
                          alt={certificate.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Fallback if image doesn't load */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {/* <FileText className="w-16 h-16 text-muted-foreground/50" /> */}
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 bg-gradient-to-r from-purple-500/10 to-transparent">
                            <p className="text-sm font-medium text-foreground">Click to enlarge</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h4 className="text-sm font-semibold mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-primary">
                          {certificate.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {certificate.organization}
                        </p>
                        <p className="text-xs text-muted-foreground/70 line-clamp-2 mt-auto">
                          {certificate.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Official Partners Section */}
      <section 
        ref={partnersRef}
        className={cn(
          "relative py-20 px-4 md:px-8",
          isDarkMode ? "bg-muted/30" : "bg-gradient-to-br from-orange-50/40 to-red-50/30"
        )}
      >
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "text-center mb-16",
            inViewSections.partners && "animate-fade-in"
          )}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Our Official Partners
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Strategic partnerships that enable us to deliver cutting-edge solutions and expand our reach across the Horn of Africa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <Card className={cn(
              "transition-all duration-500 hover:shadow-xl group",
              inViewSections.partners && "animate-fade-in-up",
              isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
            )}>
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mr-4 transition-all duration-500 group-hover:scale-110 bg-gradient-to-br from-purple-500/10 to-transparent",
                    isDarkMode ? "bg-primary/20" : "bg-primary/10"
                  )}>
                    <Globe className={cn(
                      "w-8 h-8 transition-transform duration-500 group-hover:scale-110",
                      isDarkMode ? "text-primary" : "text-primary"
                    )} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:text-primary">HD Focus Company</h3>
                    <p className="text-primary font-semibold">Official Partner - Horn of Africa</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Oskaz Import has officially signed an agreement with HD Focus Company, establishing them as the official partner in the Horn of Africa. This strategic partnership enhances collaboration and drives growth in the region.
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Strategic Technology Partnership</span>
                </div>
              </CardContent>
            </Card>

            <Card className={cn(
              "transition-all duration-500 hover:shadow-xl group",
              inViewSections.partners && "animate-fade-in-up",
              isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
            )}>
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mr-4 transition-all duration-500 group-hover:scale-110 bg-gradient-to-br from-purple-500/10 to-transparent",
                    isDarkMode ? "bg-primary/20" : "bg-primary/10"
                  )}>
                    <Users className={cn(
                      "w-8 h-8 transition-transform duration-500 group-hover:scale-110",
                      isDarkMode ? "text-primary" : "text-primary"
                    )} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:text-primary">Orchid International</h3>
                    <p className="text-primary font-semibold">Sister Company</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As a sister company of Orchid International General Importer, Oskaz Import leverages shared expertise and resources to provide comprehensive import and consultancy services across Ethiopia.
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Heart className="w-4 h-4 mr-2" />
                  <span>Family Business Network</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className={cn(
            "rounded-2xl p-8 text-center text-white transition-all duration-500 hover:shadow-2xl",
            inViewSections.partners && "animate-fade-in-up",
            isDarkMode ? "bg-gradient-to-r from-primary to-purple-600" : "bg-gradient-to-r from-primary to-purple-600"
          )}>
            <h3 className="text-2xl font-bold mb-4">Partnership Benefits</h3>
            <p className="text-lg mb-6 opacity-90">
              Our strategic partnerships enable us to offer enhanced services, broader market reach, and innovative solutions to our clients.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center transition-transform duration-500 hover:scale-105">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <h4 className="font-semibold mb-1">Enhanced Capabilities</h4>
                <p className="text-sm opacity-80">Expanded service offerings through strategic alliances</p>
              </div>
              <div className="text-center transition-transform duration-500 hover:scale-105">
                <Globe className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <h4 className="font-semibold mb-1">Regional Reach</h4>
                <p className="text-sm opacity-80">Extended coverage across the Horn of Africa</p>
              </div>
              <div className="text-center transition-transform duration-500 hover:scale-105">
                <Shield className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <h4 className="font-semibold mb-1">Quality Assurance</h4>
                <p className="text-sm opacity-80">Maintained excellence through trusted partnerships</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedCertificate(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-card rounded-lg overflow-hidden animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/75 text-white transition-all duration-300 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </Button>
            <div className="relative w-full h-full p-8">
              <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
                <Image 
                  src={`/${selectedCertificate.image}`}
                  alt={selectedCertificate.title}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain"
                />
                {/* Fallback if image doesn't load */}
                <div className="absolute inset-0 flex items-center justify-center flex-col space-y-4">
                  {/* <FileText className="w-24 h-24 text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold">{selectedCertificate.title}</h3>
                  <p className="text-muted-foreground max-w-md text-center">
                    {selectedCertificate.description}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}