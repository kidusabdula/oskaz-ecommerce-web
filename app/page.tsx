"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - iPhone Air */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide">
                ALL NEW
              </div>
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                  iPhone Air
                </h1>
                <h2 className="text-3xl lg:text-4xl font-light text-gray-700 dark:text-gray-300">
                  Begs to Be Seen
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Traditional Case
                </p>
              </div>
              <Link 
                href="/products/iphone-air"
                className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Shop iPhone Air
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-3xl aspect-square flex items-center justify-center shadow-2xl">
                <div className="text-gray-500 dark:text-gray-400 text-center">
                  <div className="w-40 h-40 bg-gray-300 dark:bg-gray-600 rounded-2xl mx-auto mb-4 shadow-lg"></div>
                  <p className="text-lg font-medium">iPhone Air Case</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Best Sellers", href: "/best-sellers" },
              { name: "Power", href: "/power" },
              { name: "Accessories", href: "/accessories" },
              { name: "Bands", href: "/bands" }
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-600 rounded-xl mx-auto mb-4 group-hover:scale-105 transition-transform"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Picks for iPhone */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Top Picks for iPhone 17
          </h2>
          <div className="grid lg:grid-cols-2 gap-16 items-center mt-12">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-3xl aspect-square flex items-center justify-center shadow-2xl">
                <div className="text-blue-700 dark:text-blue-300 text-center">
                  <div className="w-40 h-40 bg-blue-200 dark:bg-blue-700 rounded-2xl mx-auto mb-4 shadow-lg"></div>
                  <p className="text-lg font-medium">Titanium Band</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                Elevate Your New Ultra 3
              </h3>
              <h4 className="text-2xl font-light text-gray-700 dark:text-gray-300">
                Titanium Band
              </h4>
              <Link 
                href="/products/titanium-band"
                className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Shop Titanium Band
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Power Adapters Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Shop New Adapters
              </h2>
              <h3 className="text-2xl font-light text-gray-700 dark:text-gray-300">
                Power Your Essentials
              </h3>
              <Link 
                href="/products/adapters"
                className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Shop Adapters
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-3xl aspect-square flex items-center justify-center shadow-2xl">
                <div className="text-green-700 dark:text-green-300 text-center">
                  <div className="w-40 h-40 bg-green-200 dark:bg-green-700 rounded-2xl mx-auto mb-4 shadow-lg"></div>
                  <p className="text-lg font-medium">Power Adapter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Card Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-3xl aspect-square flex items-center justify-center shadow-2xl">
                <div className="text-purple-700 dark:text-purple-300 text-center">
                  <div className="w-40 h-40 bg-purple-200 dark:bg-purple-700 rounded-2xl mx-auto mb-4 shadow-lg"></div>
                  <p className="text-lg font-medium">Tracking Card</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Lost Wallet? Never Again.
              </h2>
              <h3 className="text-2xl font-light text-gray-700 dark:text-gray-300">
                Tracking Card
              </h3>
              <Link 
                href="/products/tracking-card"
                className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Shop Tracking Card
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Quote Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl lg:text-3xl font-light text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            "We create products to keep the modern nomad charged, protected, and organized on the go. 
            Purposeful design and the requisite materials are at the core of everything we do."
          </blockquote>
          <cite className="text-lg text-gray-600 dark:text-gray-400 not-italic">
            - Noah Dentzel, Co-founder & CEO
          </cite>
        </div>
      </section>

      {/* Horween Leather Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900 dark:to-orange-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                Horween® Leather
              </h2>
              <h3 className="text-3xl font-light text-gray-700 dark:text-gray-300">
                Leather That Gets Better with Age
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                With everyday use, your leather will absorb marks and oils, creating a rich finish 
                that's 100% unique to you. Whether it's Horween or Nomad leather, each piece tells 
                a story shaped by where you've been and what you've done.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-800 dark:to-orange-700 rounded-3xl aspect-square flex items-center justify-center shadow-2xl">
                <div className="text-amber-800 dark:text-amber-200 text-center">
                  <div className="w-40 h-40 bg-amber-300 dark:bg-amber-700 rounded-2xl mx-auto mb-4 shadow-lg"></div>
                  <p className="text-lg font-medium">Premium Leather</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "iPhone Cases", color: "from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800" },
              { name: "Apple Watch Bands", color: "from-green-100 to-green-200 dark:from-green-900 dark:to-green-800" },
              { name: "iPhone Folios", color: "from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800" },
              { name: "Wallets", color: "from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800" }
            ].map((category) => (
              <Link
                key={category.name}
                href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group text-center"
              >
                <div className={`bg-gradient-to-br ${category.color} rounded-2xl aspect-square flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-lg`}>
                  <div className="w-24 h-24 bg-white bg-opacity-30 rounded-xl"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nomad Community Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            From the Nomad Community
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['@stanitech', '@trasaputra', '@ulresch', '@macmike1000'].map((handle) => (
              <div key={handle} className="bg-white dark:bg-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-600 rounded-xl mx-auto mb-4"></div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{handle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            About Us
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            13 Years of Quality Goods
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Our Commitment to The Environment
          </p>
        </div>
      </section>
    </div>
  );
}
