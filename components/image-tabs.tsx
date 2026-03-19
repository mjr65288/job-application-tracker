"use client";

import { Button } from "./ui/button";
import Image from "next/image";
import { useState } from "react";

export default function ImageTabs() {
  const [activeTab, setActiveTab] = useState("organize"); // organize, hired, boards

  return (
    <section className="border-t border-border bg-background py-10 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-6 sm:mb-8">
            <Button
              onClick={() => setActiveTab("organize")}
              className={`rounded-lg px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium transition-colors shrink-0 ${
                activeTab === "organize"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span className="hidden sm:inline">Organize Applications</span>
              <span className="sm:hidden">Organize</span>
            </Button>
            <Button
              onClick={() => setActiveTab("hired")}
              className={`rounded-lg px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium transition-colors shrink-0 ${
                activeTab === "hired"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Get Hired
            </Button>
            <Button
              onClick={() => setActiveTab("boards")}
              className={`rounded-lg px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium transition-colors shrink-0 ${
                activeTab === "boards"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span className="hidden sm:inline">Manage Boards</span>
              <span className="sm:hidden">Boards</span>
            </Button>
          </div>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-border shadow-xl">
            {activeTab === "organize" && (
              <Image
                src="/hero-images/hero1.png"
                alt="Organize Applications"
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 1200px"
                className="w-full h-auto"
              />
            )}

            {activeTab === "hired" && (
              <Image
                src="/hero-images/hero2.png"
                alt="Get Hired"
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 1200px"
                className="w-full h-auto"
              />
            )}

            {activeTab === "boards" && (
              <Image
                src="/hero-images/hero3.png"
                alt="Manage Boards"
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 1200px"
                className="w-full h-auto"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
