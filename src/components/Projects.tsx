
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Ethereum", "Solana", "Wormhole"];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    return project.technologies.some((tech) =>
      tech.toLowerCase().includes(activeFilter.toLowerCase())
    );
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("projects");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="projects" className="py-24 bg-soft-purple/30">
      <div className="section-container">
        <h2 className="section-title mb-16">My Projects</h2>

        <div
          className={cn(
            "flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              className={cn(
                "px-6 py-2 rounded-full font-medium transition-all duration-300",
                activeFilter === filter
                  ? "bg-lavender text-white shadow-glow"
                  : "bg-white text-foreground hover:bg-lavender/10"
              )}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found with the selected filter.
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="https://github.com/anskp"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
