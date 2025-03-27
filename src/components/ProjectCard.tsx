
import { Project } from "@/lib/data";
import { Github, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "card-hover rounded-xl overflow-hidden bg-white shadow-soft border border-border h-full",
        "transition-all duration-300 ease-out",
        "animate-fade-in",
        `animation-delay-${index * 100}`
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video w-full relative overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300",
            isHovered ? "opacity-40" : "opacity-0"
          )}
        ></div>
        <img
          src={project.image}
          alt={project.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/90 p-3 rounded-full hover:bg-lavender hover:text-white transition-all duration-300"
            aria-label="View GitHub Repository"
          >
            <Github size={20} />
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 p-3 rounded-full hover:bg-lavender hover:text-white transition-all duration-300"
              aria-label="View Live Demo"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-secondary rounded-md text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
