
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollTopBtn = document.getElementById("scrollTopBtn");
      
      if (scrollTopBtn) {
        if (window.scrollY > 500) {
          scrollTopBtn.classList.add("opacity-100");
          scrollTopBtn.classList.remove("opacity-0", "pointer-events-none");
        } else {
          scrollTopBtn.classList.add("opacity-0", "pointer-events-none");
          scrollTopBtn.classList.remove("opacity-100");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      
      <footer className="bg-midnight py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-display font-bold">
                Muhammed<span className="text-lavender">.</span>
              </h3>
              <p className="text-white/70 mt-2">
                Blockchain Developer & Computer Science Engineering Student
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <p className="text-white/70 text-sm mb-2">
                Designed & Developed with ❤️
              </p>
              <p className="text-white/70 text-sm">
                © {new Date().getFullYear()} Muhammed Anas KP. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <button
        id="scrollTopBtn"
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 bg-lavender text-white p-3 rounded-full shadow-glow",
          "opacity-0 pointer-events-none transition-all duration-300 hover:bg-lavender/90"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};

export default Index;
