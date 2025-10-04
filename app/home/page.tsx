"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { useTranslations } from "@/lib/translations";

export default function HomePage() {
  const { language } = useLanguage();
  const t = useTranslations(language);
  
  const categories = [
    "All Products",
    ...t.homePage.categories
  ];

  const products = [
    {
      id: 1,
      name: t.homePage.products.smartBoard.name,
      category: t.homePage.products.smartBoard.category,
      price: t.homePage.products.smartBoard.price,
      originalPrice: t.homePage.products.smartBoard.originalPrice,
      image: "/api/placeholder/300/300",
      badge: "NEW",
      description: t.homePage.products.smartBoard.description
    },
    {
      id: 2,
      name: t.homePage.products.digitalSignage.name,
      category: t.homePage.products.digitalSignage.category,
      price: t.homePage.products.digitalSignage.price,
      originalPrice: t.homePage.products.digitalSignage.originalPrice,
      image: "/api/placeholder/300/300",
      badge: "BEST SELLER",
      description: t.homePage.products.digitalSignage.description
    },
    {
      id: 3,
      name: t.homePage.products.upsSystem.name,
      category: t.homePage.products.upsSystem.category,
      price: t.homePage.products.upsSystem.price,
      image: "/api/placeholder/300/300",
      description: t.homePage.products.upsSystem.description
    },
    {
      id: 4,
      name: t.homePage.products.kiosk.name,
      category: t.homePage.products.kiosk.category,
      price: t.homePage.products.kiosk.price,
      image: "/api/placeholder/300/300",
      badge: "POPULAR",
      description: t.homePage.products.kiosk.description
    },
    {
      id: 5,
      name: t.homePage.products.powerDistribution.name,
      category: t.homePage.products.powerDistribution.category,
      price: t.homePage.products.powerDistribution.price,
      image: "/api/placeholder/300/300",
      description: t.homePage.products.powerDistribution.description
    },
    {
      id: 6,
      name: t.homePage.products.presentationSystem.name,
      category: t.homePage.products.presentationSystem.category,
      price: t.homePage.products.presentationSystem.price,
      image: "/api/placeholder/300/300",
      description: t.homePage.products.presentationSystem.description
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                  {t.homePage.hero.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {t.homePage.hero.subtitle}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t.homePage.hero.featuredProduct}</h2>
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                      FEATURED
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {t.homePage.hero.productDescription}
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{t.homePage.hero.price}</span>
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">{t.homePage.hero.tag}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-300">
                    {t.homePage.hero.cta}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-3xl aspect-square flex items-center justify-center">
                <div className="w-64 h-64 bg-green-200 dark:bg-green-700 rounded-2xl flex items-center justify-center">
                  <div className="text-6xl">📊</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden mb-4 aspect-square">
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
                        {product.badge}
                      </span>
                    </div>
                  )}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-gray-400 dark:text-gray-500 text-center">
                      <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-lg mx-auto mb-2"></div>
                      <p className="text-sm">{product.name}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 dark:text-white">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                {t.homePage.qualityAssurance.title}
              </h2>
              <h3 className="text-2xl text-gray-700 dark:text-gray-300">
                {t.homePage.qualityAssurance.subtitle}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.homePage.qualityAssurance.description}
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-blue-700 dark:text-blue-300 text-center">
                  <div className="w-32 h-32 bg-blue-200 dark:bg-blue-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="text-4xl">✓</div>
                  </div>
                  <p>Certified Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Sectors Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 transform transition-all duration-500 hover:scale-105">
            {t.homePage.clientSectors.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: t.homePage.clientSectors.education, icon: '🎓' },
              { name: t.homePage.clientSectors.healthcare, icon: '🏥' },
              { name: t.homePage.clientSectors.corporate, icon: '🏢' },
              { name: t.homePage.clientSectors.government, icon: '🏛️' }
            ].map((sector, index) => (
              <div key={sector.name} className="bg-gray-100 dark:bg-gray-800 rounded-lg aspect-square flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <div className="text-center text-gray-700 dark:text-gray-300">
                  <div className="text-4xl mb-2">{sector.icon}</div>
                  <p className="text-sm font-medium">{sector.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}