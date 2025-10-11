// components/get-started.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const GetStarted = () => {
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, product: value }));
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
        product: "",
        message: ""
      });
    }, 3000);
  };

  if (!mounted) return null;

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "info@oskaz.com",
      href: "mailto:info@oskaz.com"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+251 911 123 456",
      href: "tel:+251911123456"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Address",
      value: "Bole, Addis Ababa, Ethiopia",
      href: "#"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "relative py-20 md:py-32 overflow-hidden transition-colors duration-500",
        isDarkMode ? "bg-background" : "bg-gradient-to-br from-slate-50 to-blue-50/30"
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className={cn(
          "absolute top-1/3 -left-40 h-80 w-80 rounded-full opacity-20 blur-3xl",
          isDarkMode ? "bg-green-500" : "bg-green-400"
        )}></div>
        <div className={cn(
          "absolute bottom-1/3 -right-40 h-96 w-96 rounded-full opacity-20 blur-3xl",
          isDarkMode ? "bg-blue-500" : "bg-blue-400"
        )}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-5 dark:opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16",
          isInView && "animate-fade-in"
        )}>
          <Badge variant="outline" className="px-3 py-1 text-xs font-medium rounded-full mb-4">
            <Send className="w-3 h-3 mr-1 text-primary" />
            Get Started
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Get Started Today
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ready to transform your business with our innovative solutions? Get in touch with our team and let&apos;s discuss how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className={cn(
            "order-2 lg:order-1",
            isInView && "animate-fade-in-up"
          )}>
            <Card className={cn(
              "p-8 border shadow-xl",
              isDarkMode 
                ? "bg-card/50 border-border" 
                : "bg-white/70 border-gray-200/70"
            )}>
              <CardContent className="p-0">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground">
                      We&apos;ve received your message and will get back to you within 24 hours.
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
                      <Label htmlFor="product">Product Interest</Label>
                      <Select value={formData.product} onValueChange={handleSelectChange}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a product category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kiosk">Kiosk Systems</SelectItem>
                          <SelectItem value="power">Power Solutions</SelectItem>
                          <SelectItem value="display">Digital Displays</SelectItem>
                          <SelectItem value="custom">Custom Solutions</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
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
                        placeholder="Tell us about your requirements..."
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

          {/* Contact Information */}
          <div className={cn(
            "order-1 lg:order-2 space-y-8",
            isInView && "animate-fade-in"
          )}>
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Our team of experts is ready to help you find the perfect solution for your business. Whether you&apos;re looking for a specific product or need custom development, we&apos;re here to assist you.
              </p>
            </div>
            
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card 
                  key={index}
                  className={cn(
                    "p-4 border transition-all duration-300 hover:shadow-md hover:scale-105",
                    isDarkMode 
                      ? "bg-card/50 border-border hover:bg-card/80 hover:border-primary/30" 
                      : "bg-white/70 border-gray-200/70 hover:bg-white hover:border-primary/20"
                  )}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <a 
                          href={info.href}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Business Hours */}
            <Card className={cn(
              "p-6 border",
              isDarkMode 
                ? "bg-card/50 border-border" 
                : "bg-white/70 border-gray-200/70"
            )}>
              <CardContent className="p-0">
                <h3 className="font-semibold mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" size="lg" className="group rounded-full">
                <Phone className="mr-2 h-4 w-4" />
                Call Us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="group rounded-full">
                <Mail className="mr-2 h-4 w-4" />
                Email Us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;