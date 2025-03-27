
import { skills, experiences } from "@/lib/data";
import { Code, Briefcase, GraduationCap, User } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const About = () => {
  const [activeTab, setActiveTab] = useState("skills");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("about");
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
    <section id="about" className="py-24 bg-white">
      <div className="section-container">
        <h2 className="section-title mb-16">About Me</h2>

        <div className="flex flex-col md:flex-row gap-12">
          <div
            className={cn(
              "w-full md:w-2/5 transition-all duration-700 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}
          >
            <div className="glass p-8 h-full space-y-6">
              <h3 className="text-2xl font-display font-bold">
                Computer Science Engineering Student
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hello! I'm Muhammed Anas KP, a passionate blockchain developer 
                  and Computer Science Engineering student with a focus on building 
                  secure and efficient decentralized applications.
                </p>
                <p>
                  I specialize in developing smart contracts and dApps on Ethereum and Solana, 
                  and I'm particularly interested in cross-chain solutions using Wormhole.
                </p>
                <p>
                  My journey in blockchain technology has equipped me with a deep understanding 
                  of distributed systems, cryptography, and secure coding practices. I'm always 
                  eager to learn and embrace new technologies in this rapidly evolving field.
                </p>
              </div>
              <div className="pt-4">
                <a
                  href="#contact"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Contact Me <User size={18} />
                </a>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "w-full md:w-3/5 transition-all duration-700 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
          >
            <div className="bg-secondary rounded-xl overflow-hidden shadow-soft">
              <div className="flex border-b">
                <button
                  className={cn(
                    "flex-1 py-4 px-4 text-center font-medium transition-all",
                    activeTab === "skills"
                      ? "bg-white text-lavender border-b-2 border-lavender"
                      : "text-muted-foreground hover:bg-white/50"
                  )}
                  onClick={() => setActiveTab("skills")}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Code size={18} />
                    Skills
                  </span>
                </button>
                <button
                  className={cn(
                    "flex-1 py-4 px-4 text-center font-medium transition-all",
                    activeTab === "experience"
                      ? "bg-white text-lavender border-b-2 border-lavender"
                      : "text-muted-foreground hover:bg-white/50"
                  )}
                  onClick={() => setActiveTab("experience")}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Briefcase size={18} />
                    Experience
                  </span>
                </button>
              </div>

              <div className="p-6">
                {activeTab === "skills" && (
                  <div className="stagger-animation">
                    {skills.map((category, index) => (
                      <div key={index} className="mb-6">
                        <h4 className="text-xl font-semibold mb-3">
                          {category.category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {category.items.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 bg-white rounded-full text-sm font-medium text-foreground shadow-sm border border-border"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "experience" && (
                  <div className="stagger-animation">
                    {experiences.map((exp, index) => (
                      <div
                        key={index}
                        className="mb-6 pb-6 border-b last:border-b-0 last:pb-0 last:mb-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1 bg-lavender/10 p-2 rounded-lg">
                            {exp.title.includes("Blockchain") ? (
                              <Briefcase size={20} className="text-lavender" />
                            ) : (
                              <GraduationCap size={20} className="text-lavender" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold">{exp.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <span>{exp.company}</span>
                              <span>•</span>
                              <span>{exp.period}</span>
                            </div>
                            <p className="text-muted-foreground">
                              {exp.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
