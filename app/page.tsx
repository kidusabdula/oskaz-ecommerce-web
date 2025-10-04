"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { useTranslations } from "@/lib/translations";

export default function Home() {
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
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all elements with scroll-animate class
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Hero Section - Tech Empowerment */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-20 px-4 animate-in fade-in-0 slide-in-from-top-4 duration-1000 ease-out">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in fade-in-0 slide-in-from-left-8 duration-1200 ease-out delay-300">
              <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide transform transition-all duration-500 hover:scale-110 hover:shadow-lg animate-in fade-in-0 slide-in-from-left-4 delay-500">
                PIONEER IN TECH DELIVERY
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 transform transition-all duration-700 hover:scale-105 animate-in fade-in-0 slide-in-from-left-6">
            {t.mainPage.hero.title}
          </h1>
          <h2 className="text-3xl lg:text-4xl font-light text-gray-700 dark:text-gray-300 transform transition-all duration-500 hover:text-gray-900 dark:hover:text-white animate-in fade-in-0 slide-in-from-left-6 delay-900">
            {t.mainPage.hero.subtitle}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl transform transition-all duration-300 hover:text-gray-800 dark:hover:text-gray-200 animate-in fade-in-0 slide-in-from-left-6 delay-1200">
            {t.mainPage.hero.description}
          </p>
              </div>
              <Link 
                href="/products"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-500 ease-out hover:from-blue-700 hover:to-purple-700 hover:scale-110 hover:shadow-2xl hover:-translate-y-1 animate-in fade-in-0 slide-in-from-left-6 delay-1300 group overflow-hidden relative"
              >
                <span className="relative z-10">{t.mainPage.hero.cta}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"></div>
              </Link>
            </div>
            <div className="relative animate-in fade-in-0 slide-in-from-right-8 duration-1200 ease-out delay-600">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-3xl aspect-square flex items-center justify-center shadow-2xl transform transition-all duration-700 hover:scale-105 hover:rotate-2 hover:shadow-3xl group">
                <div className="text-blue-600 dark:text-blue-400 text-center transition-all duration-500 group-hover:scale-110">
                  <div className="w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-700 dark:to-purple-700 rounded-2xl mx-auto mb-4 shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-lg opacity-90 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded"></div>
                    </div>
                  </div>
                  <p className="text-lg font-medium transition-all duration-300 group-hover:text-blue-700 dark:group-hover:text-blue-300">Smart Board in Use</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 transform transition-all duration-500 hover:scale-105">
              {t.mainPage.categories.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t.mainPage.categories.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(t.mainPage.categories.items).map(([key, category], index) => (
              <Link
                key={key}
                href={`/${key}`}
                className="group text-center p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-3 transform border border-gray-200 dark:border-gray-700 hover:border-transparent"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center shadow-md`}>
                  <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-lg opacity-80"></div>
                </div>
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white transition-all duration-300 group-hover:scale-105 mb-2`}>
                  {category.shortName}
                </h3>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                  {category.subtitle}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 transition-all duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 leading-relaxed line-clamp-3">
                  {category.description}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className={`text-sm font-medium text-blue-600 inline-flex items-center`}>
                    {category.cta} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Picks for Smart Boards */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4 transform transition-all duration-500 hover:scale-105">
            {t.mainPage.topPicks.title}
          </h2>
          <div className="grid lg:grid-cols-2 gap-16 items-center mt-12">
            <div className="relative transform transition-all duration-700 hover:scale-105 hover:-rotate-2">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-3xl aspect-square flex items-center justify-center shadow-2xl group hover:shadow-3xl transition-all duration-500">
                <div className="text-blue-700 dark:text-blue-300 text-center transition-all duration-500 group-hover:scale-110">
                  <div className="w-40 h-40 bg-blue-200 dark:bg-blue-700 rounded-2xl mx-auto mb-4 shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center">
                    <div className="w-20 h-12 bg-white dark:bg-gray-800 rounded opacity-90 flex items-center justify-center">
                      <div className="w-12 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-sm"></div>
                    </div>
                  </div>
                  <p className="text-lg font-medium transition-all duration-300 group-hover:text-blue-800 dark:group-hover:text-blue-200">{t.mainPage.topPicks.productName}</p>
                </div>
              </div>
            </div>
            <div className="space-y-6 transform transition-all duration-700 hover:translate-x-2">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white transition-all duration-500 hover:scale-105 hover:text-blue-600 dark:hover:text-blue-400">
                {t.mainPage.topPicks.description}
              </h3>
              <h4 className="text-2xl font-light text-gray-700 dark:text-gray-300 transition-all duration-300 hover:text-gray-900 dark:hover:text-white">
                {t.mainPage.topPicks.price}
              </h4>
              <Link 
                href="/products/smart-boards"
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-500 ease-out hover:from-blue-700 hover:to-blue-800 hover:scale-110 hover:shadow-2xl hover:-translate-y-1 group overflow-hidden relative"
              >
                <span className="relative z-10">{t.mainPage.topPicks.cta}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Power Solutions Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 transform transition-all duration-700 hover:translate-x-2">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white transition-all duration-500 hover:scale-105 hover:text-amber-600 dark:hover:text-amber-400">
                {t.mainPage.powerSolutions.title}
              </h2>
              <h3 className="text-2xl font-light text-gray-700 dark:text-gray-300 transition-all duration-300 hover:text-gray-900 dark:hover:text-white">
                {t.mainPage.powerSolutions.subtitle}
              </h3>
              <Link 
                href="/products/power-solutions"
                className="inline-block bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-500 ease-out hover:from-amber-700 hover:to-amber-800 hover:scale-110 hover:shadow-2xl hover:-translate-y-1 group overflow-hidden relative"
              >
                <span className="relative z-10">{t.mainPage.powerSolutions.cta}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"></div>
              </Link>
            </div>
            <div className="relative transform transition-all duration-700 hover:scale-105 hover:rotate-2">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-3xl aspect-square flex items-center justify-center shadow-2xl group hover:shadow-3xl transition-all duration-500">
                <div className="text-amber-700 dark:text-amber-300 text-center transition-all duration-500 group-hover:scale-110">
                  <div className="w-40 h-40 bg-amber-200 dark:bg-amber-700 rounded-2xl mx-auto mb-4 shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center">
                    <div className="w-20 h-16 bg-white dark:bg-gray-800 rounded opacity-90 flex items-center justify-center">
                      <div className="w-12 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-sm"></div>
                    </div>
                  </div>
                  <p className="text-lg font-medium transition-all duration-300 group-hover:text-amber-800 dark:group-hover:text-amber-200">{t.mainPage.powerSolutions.productName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Card Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative transform transition-all duration-700 hover:scale-105 hover:-rotate-2">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-3xl aspect-square flex items-center justify-center shadow-2xl group hover:shadow-3xl transition-all duration-500">
                <div className="text-purple-700 dark:text-purple-300 text-center transition-all duration-500 group-hover:scale-110">
                  <div className="w-40 h-40 bg-purple-200 dark:bg-purple-700 rounded-2xl mx-auto mb-4 shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"></div>
                  <p className="text-lg font-medium transition-all duration-300 group-hover:text-purple-800 dark:group-hover:text-purple-200">Tracking Card</p>
                </div>
              </div>
            </div>
            <div className="space-y-6 transform transition-all duration-700 hover:translate-x-2">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white transition-all duration-500 hover:scale-105 hover:text-purple-600 dark:hover:text-purple-400">
                {t.mainPage.tracking.title}
              </h2>
              <h3 className="text-2xl font-light text-gray-700 dark:text-gray-300 transition-all duration-300 hover:text-gray-900 dark:hover:text-white">
                {t.mainPage.tracking.subtitle}
              </h3>
              <Link 
                href="/products/tracking-card"
                className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-lg font-medium text-lg transition-all duration-500 ease-out hover:bg-gray-800 dark:hover:bg-gray-100 hover:scale-110 hover:shadow-2xl hover:-translate-y-1 group overflow-hidden relative"
              >
                <span className="relative z-10">{t.mainPage.tracking.cta}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Quote Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-4xl mx-auto text-center">
          <div className="transform transition-all duration-700 hover:scale-105">
            <blockquote className="text-3xl md:text-4xl font-light text-gray-800 dark:text-gray-200 mb-8 leading-relaxed transition-all duration-500 hover:text-gray-900 dark:hover:text-white">
              "{t.mainPage.ceoQuote.quote}"
            </blockquote>
            <div className="flex items-center justify-center space-x-4 transition-all duration-500 hover:scale-110">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">O</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white text-lg transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400">{t.mainPage.ceoQuote.author}</p>
                <p className="text-gray-600 dark:text-gray-400 transition-all duration-300 hover:text-gray-800 dark:hover:text-gray-200">{t.mainPage.ceoQuote.title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Commitment Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 transform transition-all duration-700 hover:translate-x-2">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white transition-all duration-500 hover:scale-105 hover:text-blue-600 dark:hover:text-blue-400">
                {t.mainPage.qualityCommitment.title}
              </h2>
              <h3 className="text-3xl font-light text-gray-700 dark:text-gray-300 transition-all duration-300 hover:text-gray-900 dark:hover:text-white">
                {t.mainPage.qualityCommitment.subtitle}
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed transition-all duration-300 hover:text-gray-800 dark:hover:text-gray-200">
                {t.mainPage.qualityCommitment.description}
              </p>
            </div>
            <div className="relative transform transition-all duration-700 hover:scale-105 hover:rotate-2">
              <div className="bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-700 rounded-3xl aspect-square flex items-center justify-center shadow-2xl group hover:shadow-3xl transition-all duration-500">
                <div className="text-blue-800 dark:text-blue-200 text-center transition-all duration-500 group-hover:scale-110">
                  <div className="w-40 h-40 bg-blue-300 dark:bg-blue-700 rounded-2xl mx-auto mb-4 shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-medium transition-all duration-300 group-hover:text-blue-900 dark:group-hover:text-blue-100">Certified Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Categories */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 transform transition-all duration-500 hover:scale-105">
            {t.mainPage.quickAccess.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: t.mainPage.quickAccess.smartBoards, color: "from-green-100 to-green-200 dark:from-green-900 dark:to-green-800", icon: "📊" },
              { name: t.mainPage.quickAccess.digitalDisplays, color: "from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800", icon: "🖥️" },
              { name: t.mainPage.quickAccess.powerSolutions, color: "from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800", icon: "⚡" },
              { name: t.mainPage.quickAccess.kioskSystems, color: "from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800", icon: "🏪" }
            ].map((category, index) => (
              <Link
                key={category.name}
                href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group text-center transform transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-4"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`bg-gradient-to-br ${category.color} rounded-2xl aspect-square flex items-center justify-center mb-4 shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-2xl`}>
                  <div className="text-6xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-all duration-300 group-hover:scale-105 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Client Success Stories */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 transform transition-all duration-500 hover:scale-105">
            {t.mainPage.clientStories.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: t.mainPage.clientStories.education, icon: '🎓' },
              { name: t.mainPage.clientStories.healthcare, icon: '🏥' },
              { name: t.mainPage.clientStories.corporate, icon: '🏢' },
              { name: t.mainPage.clientStories.government, icon: '🏛️' }
            ].map((client, index) => (
              <div 
                key={client.name} 
                className="bg-white dark:bg-gray-700 rounded-2xl p-6 text-center shadow-lg transition-all duration-500 ease-out hover:shadow-2xl hover:scale-110 hover:-translate-y-2 group transform"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {client.icon}
                </div>
                <p className="text-lg font-medium text-gray-900 dark:text-white transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-105">{client.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-4xl mx-auto text-center transform transition-all duration-700 hover:scale-105">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-500 hover:text-blue-600 dark:hover:text-blue-400">
            {t.mainPage.footerCta.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 transition-all duration-300 hover:text-gray-800 dark:hover:text-gray-200">
            {t.mainPage.footerCta.description}
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-500 ease-out hover:from-blue-700 hover:to-indigo-700 hover:scale-110 hover:shadow-2xl hover:-translate-y-1"
          >
            {t.mainPage.footerCta.cta}
          </Link>
        </div>
      </section>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) scale(1) !important;
        }
        
        .scroll-animate.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}
