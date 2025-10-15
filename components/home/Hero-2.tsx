"use client";

import React from "react";
// Minimal hero: removed unused UI imports
import { cn } from "@/lib/utils";
import { CheckCircle, MousePointer } from "lucide-react";

const REVEAL_DURATION_MS = 2800;
const REVEAL_OUT_DURATION_MS = Math.round(REVEAL_DURATION_MS * 0.75);

const Hero2 = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isHeaderHovered, setIsHeaderHovered] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [preloadMode, setPreloadMode] = React.useState<"none" | "metadata" | "auto">("none");
  const [sourceUrl, setSourceUrl] = React.useState<string | null>(null);
  const [hasVideoError, setHasVideoError] = React.useState(false);
  
  type NavigatorConnection = { effectiveType?: string; saveData?: boolean };
  type NavigatorWithConnection = Navigator & { connection?: NavigatorConnection };

  // Network-aware, in-view preloading to improve reliability in production
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Detect connection and user data-saver preferences
    const conn = (navigator as NavigatorWithConnection).connection;
    const isFast = conn?.effectiveType === "4g" && !conn?.saveData;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          // Upgrade preload when in view (metadata on slow, auto on fast)
          setPreloadMode(isFast ? "auto" : "metadata");
          if (!sourceUrl) {
            setSourceUrl("/oskaz-hero-background.mp4");
          }
          const v = videoRef.current;
          if (v) {
            try {
              v.load();
            } catch {}
          }
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative h-auto md:h-[70vh] flex items-start md:items-center justify-center overflow-visible md:overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl mx-4 sm:mx-6 md:mx-10 my-6 md:my-10 transition-colors",
        !isHeaderHovered && "bg-white dark:bg-black"
      )}
      style={{
        // Unify circle center for video and all overlays
        ["--reveal" as string]: isHeaderHovered
          ? "circle(140% at 50% 50%)"
          : "circle(0% at 50% 50%)",
      }}
    >
      {/* Video Background with Opening Animation (hidden on mobile) */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem] md:rounded-[3rem] hidden md:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload={preloadMode}
          poster="/DesignConcept.jpg"
          crossOrigin="anonymous"
          aria-label="Background reveal video"
          controlsList="nodownload noplaybackrate nofullscreen"
          disablePictureInPicture
          className={cn(
            "w-full h-full object-cover rounded-[3rem] transition-all duration-1000 ease-out",
             "scale-100 opacity-100" 
          )}
          ref={videoRef}
          style={{
            clipPath: "var(--reveal)",
            transition: `clip-path ${isHeaderHovered ? REVEAL_DURATION_MS : REVEAL_OUT_DURATION_MS}ms ease-in-out`,
            willChange: "clip-path",
          }}
          src={sourceUrl ?? undefined}
          onError={() => setHasVideoError(true)}
          onAbort={() => setHasVideoError(true)}
          onStalled={() => setHasVideoError(true)}
          onLoadedData={() => setHasVideoError(false)}
          onCanPlay={() => {
            setHasVideoError(false);
            try {
              videoRef.current?.play();
            } catch {}
          }}
        />
        {/* Animated Gradient Overlay */}
        <div
          className={cn(
            "absolute inset-0 rounded-[3rem]"
          )}
          style={{
            clipPath: "var(--reveal)",
            transition: `clip-path ${isHeaderHovered ? REVEAL_DURATION_MS : REVEAL_OUT_DURATION_MS}ms ease-in-out`,
            willChange: "clip-path",
            background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.6) 100%)",
          }}
        ></div>
        
        {/* Removed grid overlay */}

        {/* Removed cinematic bottom gradient */}

        {/* Removed cinematic right gradient */}

        {/* Removed extra circular overlays to keep only central reveal */}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 md:py-16 flex flex-col items-center text-center translate-y-2 md:translate-y-6">
        {/* Removed badge for a cleaner hero */}

        {/* Main Heading with Staggered Animation */}
        <div
          className="space-y-4"
          onMouseEnter={() => {
            setIsHeaderHovered(true);
            const v = videoRef.current;
            if (v) {
              try {
                v.currentTime = 0;
                v.play();
              } catch {}
            }
          }}
          onMouseLeave={() => setIsHeaderHovered(false)}
        >
          <h1
            className={cn(
              "text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-2xl mx-auto text-center transition-all duration-700",
              "translate-y-0 opacity-100",
              isHeaderHovered ? "text-white" : "text-neutral-900 dark:text-white"
            )}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Intelligent Technology
            </span>{" "}
            for Modern Business
          </h1>

          {/* Hover indicator (desktop only) */}
          <div
            className={cn(
              "hidden md:flex items-center justify-center gap-2 mx-auto text-sm transition-all duration-500",
              isHeaderHovered ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
            )}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-black/40 backdrop-blur px-3 py-1 shadow-sm hover:bg-white/80 dark:hover:bg-black/60">
              <MousePointer className="h-4 w-4 text-primary" />
              <span className="text-neutral-700 dark:text-neutral-300">Hover</span>
            </span>
          </div>

          <div className="space-y-3 mt-2">
            <div
              className={cn(
                "flex items-center justify-center space-x-3 transition-all duration-500 ease-in-out",
                isHeaderHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
              style={{ transitionDelay: isHeaderHovered ? "0ms" : "0ms" }}
            >
              <CheckCircle className="h-5 w-5 text-primary" />
              <span
                className={cn(
                  "text-base md:text-lg",
                  isHeaderHovered ? "text-neutral-200" : "text-neutral-700 dark:text-neutral-300"
                )}
              >
                Industry-specific solutions
              </span>
            </div>
            <div
              className={cn(
                "flex items-center justify-center space-x-3 transition-all duration-500 ease-in-out",
                isHeaderHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
              style={{ transitionDelay: isHeaderHovered ? "100ms" : "0ms" }}
            >
              <CheckCircle className="h-5 w-5 text-primary" />
              <span
                className={cn(
                  "text-base md:text-lg",
                  isHeaderHovered ? "text-neutral-200" : "text-neutral-700 dark:text-neutral-300"
                )}
              >
                Dedicated support team
              </span>
            </div>
            <div
              className={cn(
                "flex items-center justify-center space-x-3 transition-all duration-500 ease-in-out",
                isHeaderHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
              style={{ transitionDelay: isHeaderHovered ? "200ms" : "0ms" }}
            >
              <CheckCircle className="h-5 w-5 text-primary" />
              <span
                className={cn(
                  "text-base md:text-lg",
                  isHeaderHovered ? "text-neutral-200" : "text-neutral-700 dark:text-neutral-300"
                )}
              >
                Continuous updates and improvements
              </span>
            </div>
            <div
              className={cn(
                "flex items-center justify-center space-x-3 transition-all duration-500 ease-in-out",
                isHeaderHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
              style={{ transitionDelay: isHeaderHovered ? "300ms" : "0ms" }}
            >
              <CheckCircle className="h-5 w-5 text-primary" />
              <span
                className={cn(
                  "text-base md:text-lg",
                  isHeaderHovered ? "text-neutral-200" : "text-neutral-700 dark:text-neutral-300"
                )}
              >
                Data security and compliance
              </span>
            </div>
          </div>
        </div>

        {/* Non-hover marketing content: paragraphs and simple cards */}
        <div
          className={cn(
            "max-w-3xl mt-1 transition-[opacity,transform] duration-600",
            isHeaderHovered ? "opacity-0 translate-y-2" : "opacity-100 -translate-y-3"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(0.25, 0.8, 0.25, 1)",
            transitionDelay: "0ms",
            willChange: "opacity, transform",
          }}
          aria-hidden={isHeaderHovered}
        >
          <p className={cn("text-sm md:text-base", "text-neutral-700 dark:text-neutral-300")}> 
            Build smarter operations with AI-driven automation, IoT connectivity, and seamless integrations — designed for modern teams.
          </p>
          <p className={cn("text-sm md:text-base mt-2", "text-neutral-600 dark:text-neutral-400")}> 
            Scale confidently with secure infrastructure, fast onboarding, and outcomes you can measure.
          </p>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 transition-[opacity,transform] duration-600",
            isHeaderHovered ? "opacity-0 translate-y-2" : "opacity-100 -translate-y-3"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(0.25, 0.8, 0.25, 1)",
            transitionDelay: "0ms",
            willChange: "opacity, transform",
          }}
          aria-hidden={isHeaderHovered}
        >
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">AI Automation</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Streamline workflows and reduce manual tasks.</p>
          </div>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">IoT Connectivity</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Connect devices and gain real-time insights.</p>
          </div>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Secure by Design</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Enterprise-grade security and compliance built-in.</p>
          </div>
        </div>

        {/* Removed stats section */}

        {/* Removed feature icons */}

        {/* Removed CTA buttons */}

        {/* Removed decorative floating elements */}
      </div>

      {/* Removed scroll indicator for minimal layout */}
    </section>
  );
};

export default Hero2;