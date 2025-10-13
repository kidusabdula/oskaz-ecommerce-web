"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { useTranslations } from "@/lib/translations";

export default function HomePage() {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            entry.target.classList.remove("animate-out");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const elements = document.querySelectorAll(
      ".scroll-animate"
    );
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const categories = ["All Products", ...t.homePage.categories];

  const products = [
    {
      id: 1,
      name: t.homePage.products.smartBoard.name,
      category: t.homePage.products.smartBoard.category,
      price: t.homePage.products.smartBoard.price,
      originalPrice: t.homePage.products.smartBoard.originalPrice,
      image: "/api/placeholder/300/300",
      badge: "NEW",
      description: t.homePage.products.smartBoard.description,
    },
    {
      id: 2,
      name: t.homePage.products.digitalSignage.name,
      category: t.homePage.products.digitalSignage.category,
      price: t.homePage.products.digitalSignage.price,
      originalPrice: t.homePage.products.digitalSignage.originalPrice,
      image: "/api/placeholder/300/300",
      badge: "BEST SELLER",
      description: t.homePage.products.digitalSignage.description,
    },
    {
      id: 3,
      name: t.homePage.products.upsSystem.name,
      category: t.homePage.products.upsSystem.category,
      price: t.homePage.products.upsSystem.price,
      image: "/api/placeholder/300/300",
      description: t.homePage.products.upsSystem.description,
    },
    {
      id: 4,
      name: t.homePage.products.kiosk.name,
      category: t.homePage.products.kiosk.category,
      price: t.homePage.products.kiosk.price,
      image: "/api/placeholder/300/300",
      badge: "POPULAR",
      description: t.homePage.products.kiosk.description,
    },
    {
      id: 5,
      name: t.homePage.products.powerDistribution.name,
      category: t.homePage.products.powerDistribution.category,
      price: t.homePage.products.powerDistribution.price,
      image: "/api/placeholder/300/300",
      description: t.homePage.products.powerDistribution.description,
    },
    {
      id: 6,
      name: t.homePage.products.presentationSystem.name,
      category: t.homePage.products.presentationSystem.category,
      price: t.homePage.products.presentationSystem.price,
      image: "/api/placeholder/300/300",
      description: t.homePage.products.presentationSystem.description,
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = selectedCategory === "All Products" || p.category === selectedCategory;
      const text = `${p.name} ${p.description ?? ""} ${p.category}`.toLowerCase();
      const matchesQuery = !query || text.includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Dashboard Header */}
      <section className="px-4 py-10">
        <div className="max-w-[90rem] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-700 ease-out">
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                {t.homePage.hero.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t.homePage.hero.subtitle}
              </p>
            </div>
            <div className="flex w-full md:w-auto items-center gap-3">
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-72 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => setViewMode("grid")}
                aria-pressed={viewMode === "grid"}
                className={`hidden md:inline-flex px-3 py-2 text-sm rounded-full border text-gray-700 dark:text-gray-300 ${
                  viewMode === "grid"
                    ? "border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-pressed={viewMode === "list"}
                className={`hidden md:inline-flex px-3 py-2 text-sm rounded-full border text-gray-700 dark:text-gray-300 ${
                  viewMode === "list"
                    ? "border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sidebar + Products Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-6">
          {/* Sidebar */}
          <aside className="space-y-4 transition-all duration-700 ease-out">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900 p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Browse</h3>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-1.5 rounded-full text-sm transition-all duration-200 border border-transparent bg-white/60 dark:bg-gray-900/50 text-gray-900 dark:text-gray-200 backdrop-blur-sm ring-1 ring-gray-200/70 dark:ring-gray-700/70 hover:bg-white hover:dark:bg-gray-800 hover:ring-indigo-500/40 hover:shadow-sm hover:translate-y-px ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white ring-0 shadow-sm hover:from-blue-700 hover:to-indigo-700"
                        : ""
                    }`}
                    style={{ animationDelay: `${index * 30}ms` }}
                    aria-pressed={selectedCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900 p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Quick filters</h3>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {["Featured", "Popular", "Best Seller", "New"].map((label) => (
                  <span
                    key={label}
                    className="px-3 py-1.5 rounded-full text-xs border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Products</h2>
              <span className="text-xs text-gray-500 dark:text-gray-400">Showing {filteredProducts.length} items</span>
            </div>

            <div className={`grid gap-6 transition-all duration-800 ease-out ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-lg transition-all duration-300 p-4"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {viewMode === 'grid' ? (
                    <>
                      <div className="relative rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800">
                        <div className="relative w-full h-72 md:h-80 lg:h-96">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                            className="object-cover"
                          />
                        </div>
                        {product.badge && (
                          <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-black/80 text-white dark:bg-white/80 dark:text-black px-2 py-1 text-xs font-medium">
                            {product.badge}
                          </span>
                        )}
                        <div className="absolute inset-0 ring-1 ring-black/5 dark:ring-white/10 pointer-events-none"></div>
                      </div>

                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-gray-900 dark:text-white">{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                          )}
                        </div>
                        <Link href="/services" className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-xs font-medium text-white hover:from-blue-700 hover:to-indigo-700">
                          View
                        </Link>
                      </div>

                      <span className="mt-3 inline-flex items-center rounded-full border border-gray-300 dark:border-gray-700 px-2 py-1 text-xs text-gray-700 dark:text-gray-300">
                        {product.category}
                      </span>
                    </>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="relative w-64 h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="320px"
                          className="object-cover"
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-black/80 text-white dark:bg-white/80 dark:text-black px-2 py-1 text-[10px] font-medium">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="inline-flex items-center rounded-full border border-gray-300 dark:border-gray-700 px-2 py-1 text-[11px] text-gray-700 dark:text-gray-300">
                            {product.category}
                          </span>
                          <Link href="/services" className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-xs font-medium text-white hover:from-blue-700 hover:to-indigo-700">
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}