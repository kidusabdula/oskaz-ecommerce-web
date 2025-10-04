"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const categories = [
    "All",
    "iPhone Cases", 
    "Apple Watch Bands",
    "iPhone Folios",
    "Wallets",
    "Power",
    "Accessories"
  ];

  const products = [
    {
      id: 1,
      name: "iPhone Air Case",
      category: "iPhone Cases",
      price: "$49.95",
      originalPrice: "$59.95",
      image: "/placeholder-iphone-case.jpg",
      badge: "NEW",
      description: "Traditional Case - Begs to Be Seen"
    },
    {
      id: 2,
      name: "Titanium Band",
      category: "Apple Watch Bands", 
      price: "$199.95",
      image: "/placeholder-watch-band.jpg",
      badge: "BEST SELLER",
      description: "Elevate Your New Ultra 3"
    },
    {
      id: 3,
      name: "Leather Wallet",
      category: "Wallets",
      price: "$79.95",
      image: "/placeholder-wallet.jpg",
      description: "Horween® Leather - Gets Better with Age"
    },
    {
      id: 4,
      name: "Tracking Card",
      category: "Accessories",
      price: "$29.95",
      image: "/placeholder-tracking-card.jpg",
      badge: "POPULAR",
      description: "Lost Wallet? Never Again."
    },
    {
      id: 5,
      name: "Power Adapter",
      category: "Power",
      price: "$39.95",
      image: "/placeholder-adapter.jpg",
      description: "Power Your Essentials"
    },
    {
      id: 6,
      name: "iPhone Folio",
      category: "iPhone Folios",
      price: "$89.95",
      image: "/placeholder-folio.jpg",
      description: "Premium Leather Protection"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Best Sellers
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              "We create products to keep the modern nomad charged, protected, and organized on the go. 
              Purposeful design and the requisite materials are at the core of everything we do."
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
              - Noah Dentzel, Co-founder & CEO
            </p>
          </div>

          {/* Featured Product Showcase */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
                ALL NEW
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                iPhone Air
              </h2>
              <h3 className="text-2xl text-gray-700 dark:text-gray-300">
                Begs to Be Seen
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Traditional Case
              </p>
              <Link 
                href="/products/iphone-air"
                className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-gray-500 dark:text-gray-400 text-center">
                  <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-lg mx-auto mb-4"></div>
                  <p>iPhone Air Case</p>
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

      {/* Material Highlight Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Horween® Leather
              </h2>
              <h3 className="text-2xl text-gray-700 dark:text-gray-300">
                Leather That Gets Better with Age
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                With everyday use, your leather will absorb marks and oils, creating a rich finish 
                that's 100% unique to you. Whether it's Horween or Nomad leather, each piece tells 
                a story shaped by where you've been and what you've done.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-amber-700 dark:text-amber-300 text-center">
                  <div className="w-32 h-32 bg-amber-200 dark:bg-amber-700 rounded-lg mx-auto mb-4"></div>
                  <p>Premium Leather</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            From the Nomad Community
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['@stanitech', '@trasaputra', '@ulresch', '@macmike1000'].map((handle) => (
              <div key={handle} className="bg-gray-100 dark:bg-gray-800 rounded-lg aspect-square flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-lg mx-auto mb-2"></div>
                  <p className="text-sm">{handle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}