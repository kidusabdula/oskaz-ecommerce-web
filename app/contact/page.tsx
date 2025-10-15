// app/contact/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  MessageSquare,
  Users,
  Building,
  Globe,
  ArrowRight,
  Navigation,
  Copy
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    service: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const current = sectionRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        service: ""
      });
    }, 3000);
  };

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

  const contactMethods = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+251 911 204 731",
      description: "Mon-Fri from 9am to 6pm",
      href: "tel:+251911204731"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "info@oskaz.com",
      description: "We'll respond within 24 hours",
      href: "mailto:info@oskaz.com"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Office",
      value: "Bahar Building, 4th Floor",
      description: "Bole, Addis Ababa, Ethiopia",
      href: "#"
    }
  ];

  const services = [
    "Import Services",
    "Kiosk Systems",
    "Power Solutions",
    "Digital Displays",
    "Custom Solutions",
    "Technical Support",
    "Consultancy Services",
    "Other"
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ];

  const teamContacts = [
    {
      name: "Sales Team",
      email: "sales@oskaz.com",
      phone: "+251 911 204 731",
      description: "For product inquiries and orders"
    },
    {
      name: "Technical Support",
      email: "support@oskaz.com",
      phone: "+251 911 204 731",
      description: "For technical assistance and support"
    },
    {
      name: "Partnerships",
      email: "partnerships@oskaz.com",
      phone: "+251 911 123 458",
      description: "For business partnerships and collaborations"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-14">
      {/* Hero Section */}
      <section className={cn(
        "relative py-20 px-4 overflow-hidden",
        isDarkMode ? "bg-gradient-to-b from-background to-muted/30" : "bg-gradient-to-b from-gray-50 to-white"
      )}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={cn(
            "absolute top-1/4 -left-40 h-80 w-80 rounded-full opacity-20 blur-3xl",
            isDarkMode ? "bg-primary" : "bg-blue-400"
          )}></div>
          <div className={cn(
            "absolute bottom-1/4 -right-40 h-96 w-96 rounded-full opacity-20 blur-3xl",
            isDarkMode ? "bg-purple-500" : "bg-purple-400"
          )}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className={cn(
            "text-center max-w-4xl mx-auto",
            isInView && "animate-fade-in"
          )}>
            <Badge variant="outline" className="px-3 py-1 text-xs font-medium rounded-full mb-4">
              <MessageSquare className="w-3 h-3 mr-1 text-primary" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Have questions about our products or services? We&#39;re here to help. Reach out to our team and we&#39;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className={cn(
            "text-center mb-12",
            isInView && "animate-fade-in"
          )}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the most convenient way to reach us. We&#39;re always ready to help you find the perfect solution.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className={cn(
                  "text-center transition-all duration-300 hover:shadow-lg hover:scale-105",
                  isInView && "animate-fade-in-up",
                  isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
                )}
                style={{ 
                  animationDelay: isInView ? `${index * 100}ms` : '0ms'
                }}
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-purple-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{method.label}</h3>
                  <p className="text-muted-foreground mb-4">{method.description}</p>
                  <a 
                    href={method.href}
                    className="text-primary font-medium hover:text-primary/80 transition-colors"
                  >
                    {method.value}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className={cn(
        "py-16 px-4",
        isDarkMode ? "bg-muted/30" : "bg-gray-50"
      )}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className={cn(
              "order-2 lg:order-1",
              isInView && "animate-fade-in"
            )}>
              <Card className={cn(
                "border shadow-xl",
                isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
              )}>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                      <p className="text-muted-foreground">
                        We&#39;ve received your message and will get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+251 9xx xxx xxx"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">Company Name</Label>
                          <Input
                            id="company"
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Your Company"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="service">Service Interest</Label>
                        <Select value={formData.service} onValueChange={handleSelectChange}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="How can we help you?"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us more about your requirements..."
                          className="mt-1"
                        />
                      </div>
                      
                      <Button type="submit" size="lg" className="w-full group rounded-full">
                        Send Message
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Office Information */}
            <div className={cn(
              "order-1 lg:order-2 space-y-8",
              isInView && "animate-fade-in"
            )}>
              {/* Office Location with Map */}
              <Card className={cn(
                "border",
                isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
              )}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Office Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Embedded Google Map */}
                  <div className="relative h-64 rounded-lg overflow-hidden border">
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
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Our Location</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Address</p>
                          <p className="font-medium">Bahar Building 4th Floor</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard('Bahar Building 4th Floor', 'address')}
                        className="flex items-center"
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
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
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
                        className="flex items-center"
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
                  
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full group"
                    onClick={() => window.open('https://maps.app.goo.gl/egNnzgYLZsf2PkPa8', '_blank')}
                  >
                    <Navigation className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                    Open in Google Maps
                  </Button>
                </CardContent>
              </Card>

              {/* Office Hours */}
              <Card className={cn(
                "border",
                isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
              )}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="font-medium text-sm">{schedule.day}</span>
                      <span className="text-muted-foreground text-sm">{schedule.hours}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Team Contacts */}
              <Card className={cn(
                "border",
                isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
              )}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Contact Our Teams
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teamContacts.map((team, index) => (
                    <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                      <h4 className="font-semibold mb-1">{team.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{team.description}</p>
                      <div className="space-y-1">
                        <a 
                          href={`mailto:${team.email}`}
                          className="text-sm text-primary hover:text-primary/80 flex items-center transition-colors"
                        >
                          <Mail className="w-3 h-3 mr-1" />
                          {team.email}
                        </a>
                        <a 
                          href={`tel:${team.phone}`}
                          className="text-sm text-primary hover:text-primary/80 flex items-center transition-colors"
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          {team.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className={cn(
            "text-center max-w-4xl mx-auto",
            isInView && "animate-fade-in"
          )}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Still have questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can&#39;t find what you&#39;re looking for? Our comprehensive FAQ section might have the answers you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group rounded-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Browse FAQ
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="group rounded-full">
                <Globe className="mr-2 h-4 w-4" />
                Live Chat
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}