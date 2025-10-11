"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { useTranslations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Globe, Users, Award, TrendingUp, Shield, Heart, Code, X, FileText } from "lucide-react";

export default function AboutPage() {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create intersection observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.classList.remove('animate-out');
            
            // Add staggered animations for child elements
            const children = entry.target.querySelectorAll('.stagger-item');
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('animate-in');
                child.classList.remove('animate-out');
              }, index * 100);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe all elements with scroll-animate class
    const elements = document.querySelectorAll('.scroll-animate, .motion-fade-in, .motion-slide-up, .motion-scale-in');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Modal state for certificate viewing
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  // Certificate data
  const certificates = [
    {
      id: 1,
      title: "Africa Centre of Excellence for Water Management",
      organization: "Addis Ababa University",
      image: "/africa-center-excellence.png",
      description: "Recognition for supply of Smart Board technology and equipment"
    },
    {
      id: 2,
      title: "City Government of Addis Ababa",
      organization: "Municipal Authority",
      image: "/city-government-addis-ababa.png",
      description: "Certificate for successful completion of engineering items and computer accessories supply"
    },
    {
      id: 3,
      title: "Ethiopian Public Health Institute",
      organization: "Ministry of Health",
      image: "/ethiopian-health-institution.png",
      description: "Recognition for supply and installation of Digital Signage Systems and Interactive Touch Board"
    },
    {
      id: 4,
      title: "Federal Police Commission",
      organization: "Federal Democratic Republic of Ethiopia",
      image: "/federal-police-commission.png",
      description: "Certificate for supply of Cisco ASA 5585-S10-K9 Firewall and TransceiverSFP+"
    },
    {
      id: 5,
      title: "Mizan Tepi University",
      organization: "Higher Education Institution",
      image: "/mizan-tepi-university.png",
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

  return (
    <div className="min-h-screen bg-white dark:bg-black overflow-hidden">
      {/* Calming Learn Page Style Gradient - From Top - Dark Mode */}
      <div className="absolute top-0 left-0 right-0 h-[20rem] bg-gradient-to-b from-[#17171a]/90 via-zinc-800/60 to-transparent z-10 pointer-events-none hidden dark:block"></div>
      
      {/* Calming Learn Page Style Gradient - From Top - Light Mode */}
      <div className="absolute top-0 left-0 right-0 h-[20rem] bg-gradient-to-b from-[#444a57]/90 via-[#444a57]/60 to-transparent z-10 pointer-events-none block dark:hidden"></div>

      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 px-4 md:px-8 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              About{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                <span className="text-6xl md:text-8xl">ኦ</span>skaz®
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              An Import, Retail and Consultancy firm, sister company of Orchid International General Importer. Empowering organizations with cutting-edge technologies and expert consultancy services since 2007.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" passHref>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  aria-label="Get In Touch"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:bg-transparent"
                >
                  Get In Touch
                  <svg 
                    className="ml-2 h-5 w-5 inline-block transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
              <Link href="/services" passHref>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  aria-label="Our Services"
                  className="group border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Our Services
                  <svg 
                    className="ml-2 h-5 w-5 inline-block transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative w-full py-20 px-4 md:px-8 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center stagger-item"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative w-full py-20 px-4 md:px-8 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Established on November 12, 2007 G.C under Ethiopian law with a starting capital of 300,000.00 Birr, Oskaz Import was founded by Ato. Osman Kedir as an Import, Retail and Consultancy firm. As a sister company of Orchid International General Importer, we began with a vision to bridge the gap between cutting-edge technology and Ethiopian businesses.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                With <strong>17 years of experience</strong>, we have grown from a local startup to a trusted partner for organizations across Ethiopia. Our expertise spans import services, retail operations, and comprehensive consultancy services for public, private, and voluntary organizations, helping them adapt and implement the latest technologies.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium">
                  Import & Delivery
                </div>
                <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg font-medium">
                  Tech Consultancy
                </div>
                <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium">
                  Retail Services
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-3xl p-1">
                <div className="w-full h-full bg-white dark:bg-black rounded-3xl overflow-hidden relative group cursor-pointer"
                     onClick={() => {
                       const mapUrl = 'https://maps.app.goo.gl/egNnzgYLZsf2PkPa8?g_st=atm';
                       try {
                         window.open(mapUrl, '_blank', 'noopener,noreferrer');
                       } catch (error) {
                         // Fallback for older browsers or restricted environments
                         window.location.href = mapUrl;
                       }
                     }}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 z-10 flex items-center justify-center">
                    <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-xl p-4 text-center transform group-hover:scale-105 transition-transform duration-300">
                      <Globe className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        Our Location
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Addis Ababa, Ethiopia
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        Click to view on Google Maps
                      </p>
                    </div>
                  </div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252230.02028974562!2d38.613328!3d8.963479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1635000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-3xl"
                  ></iframe>
                </div>
              </div>
            </motion.div>
            
            {/* Exact Location Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 bg-white dark:bg-black rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Exact Location
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-gray-50 dark:bg-black rounded-lg p-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                    <p className="font-medium text-gray-900 dark:text-white" id="building-address">
                      Bahar Building 4th Floor
                    </p>
                  </div>
                  <button
                    onClick={(event) => {
                      navigator.clipboard.writeText('Bahar Building 4th Floor');
                      const button = event.target as HTMLButtonElement;
                      const originalText = button.textContent;
                      button.textContent = 'Copied!';
                      setTimeout(() => {
                        button.textContent = originalText;
                      }, 2000);
                    }}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md transition-colors duration-200 flex items-center"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </button>
                </div>
                
                <div className="flex items-center justify-between bg-gray-50 dark:bg-black rounded-lg p-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Google Maps Link</p>
                    <p className="font-medium text-gray-900 dark:text-white text-xs break-all" id="maps-link">
                      https://maps.app.goo.gl/egNnzgYLZsf2PkPa8?g_st=atm
                    </p>
                  </div>
                  <button
                    onClick={(event) => {
                      navigator.clipboard.writeText('https://maps.app.goo.gl/egNnzgYLZsf2PkPa8?g_st=atm');
                      const button = event.target as HTMLButtonElement;
                      const originalText = button.textContent;
                      button.textContent = 'Copied!';
                      setTimeout(() => {
                        button.textContent = originalText;
                      }, 2000);
                    }}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md transition-colors duration-200 flex items-center"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative w-full py-20 px-4 md:px-8 bg-gray-50 dark:bg-black/50 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our relationships with clients and partners.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white dark:bg-black rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 stagger-item"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative w-full py-20 px-4 md:px-8 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our Experts
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our team of seasoned professionals brings specialized expertise in international trade, technology consulting, and business solutions to deliver exceptional results.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group stagger-item"
              >
                <div className="relative mb-6 mx-auto w-48 h-48">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-full p-1">
                    <div className="w-full h-full bg-gray-200 dark:bg-black rounded-full flex items-center justify-center">
                      <Users className="w-20 h-20 text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="relative w-full py-20 px-4 md:px-8 bg-gray-50 dark:bg-black scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Client Testimonials
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear what our valued clients say about their experience with Oskaz Import's professional services and solutions.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group stagger-item"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                  "{testimonial.testimonial}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Goodwill and Recognitions Section */}
      <section className="relative w-full py-20 px-4 md:px-8 bg-white dark:bg-black scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Goodwill and Recognitions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our commitment to excellence has earned us recognition and trust from prestigious organizations across Ethiopia.
            </p>
          </motion.div>
          




          {/* Certificates Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Official Certificates & Recognition
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {certificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedCertificate(certificate.image)}
                >
                  <div className="relative bg-white dark:bg-black rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-4 group-hover:scale-105">
                    <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-white dark:bg-white border border-gray-200 dark:border-gray-600">
                      <Image
                        src={certificate.image}
                        alt={certificate.title}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300 p-2"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <FileText className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {certificate.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                      {certificate.organization}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {certificate.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Official Partners Section */}
      <section className="relative w-full py-20 px-4 md:px-8 bg-gray-50 dark:bg-black scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Official Partners
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Strategic partnerships that enable us to deliver cutting-edge solutions and expand our reach across the Horn of Africa.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-black p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">HD Focus Company</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">Official Partner - Horn of Africa</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Oskaz Import has officially signed an agreement with HD Focus Company, establishing them as the official partner in the Horn of Africa. This strategic partnership enhances collaboration and drives growth in the region.
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Shield className="w-4 h-4 mr-2" />
                <span>Strategic Technology Partnership</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-black p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Orchid International</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">Sister Company</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                As a sister company of Orchid International General Importer, Oskaz Import leverages shared expertise and resources to provide comprehensive import and consultancy services across Ethiopia.
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Heart className="w-4 h-4 mr-2" />
                <span>Family Business Network</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-8 text-center text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Partnership Benefits</h3>
            <p className="text-lg mb-6 opacity-90">
              Our strategic partnerships enable us to offer enhanced services, broader market reach, and innovative solutions to our clients.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <h4 className="font-semibold mb-1">Enhanced Capabilities</h4>
                <p className="text-sm opacity-80">Expanded service offerings through strategic alliances</p>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <h4 className="font-semibold mb-1">Regional Reach</h4>
                <p className="text-sm opacity-80">Extended coverage across the Horn of Africa</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <h4 className="font-semibold mb-1">Quality Assurance</h4>
                <p className="text-sm opacity-80">Maintained excellence through trusted partnerships</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedCertificate}
                alt="Certificate"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}