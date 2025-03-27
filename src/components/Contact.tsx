
import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    status: "idle",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ status: "loading", message: "" });

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus({
        status: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ status: "idle", message: "" });
      }, 5000);
    }, 1500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("contact");
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
    <section id="contact" className="py-24 bg-white">
      <div className="section-container">
        <h2 className="section-title mb-16">Get In Touch</h2>

        <div className="flex flex-col md:flex-row gap-12">
          <div
            className={cn(
              "w-full md:w-2/5 transition-all duration-700 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}
          >
            <div className="glass p-8 h-full space-y-8">
              <h3 className="text-2xl font-display font-bold">
                Let's build something amazing together
              </h3>
              <p className="text-muted-foreground">
                Feel free to reach out for collaborations, project inquiries, or just to say hello!
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="bg-lavender/10 p-3 rounded-lg">
                    <Mail className="text-lavender" size={22} />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:anaskoyakkara@gmail.com"
                      className="text-muted-foreground hover:text-lavender transition-colors"
                    >
                      anaskoyakkara@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-lavender/10 p-3 rounded-lg">
                    <Github className="text-lavender" size={22} />
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <a
                      href="https://github.com/anskp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-lavender transition-colors"
                    >
                      github.com/anskp
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-lavender/10 p-3 rounded-lg">
                    <Linkedin className="text-lavender" size={22} />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-lavender transition-colors"
                    >
                      linkedin.com/in/muhammed-anas
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "w-full md:w-3/5 transition-all duration-700 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
          >
            <div className="bg-white rounded-xl shadow-soft border border-border p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-lavender/50 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-lavender/50 transition-all"
                    placeholder="Your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-lavender/50 transition-all resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={cn(
                    "btn-primary w-full flex items-center justify-center gap-2",
                    submitStatus.status === "loading" && "opacity-70 cursor-not-allowed"
                  )}
                  disabled={submitStatus.status === "loading"}
                >
                  {submitStatus.status === "loading" ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>

                {submitStatus.status !== "idle" && (
                  <div
                    className={cn(
                      "text-center p-3 rounded-lg",
                      submitStatus.status === "success"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    )}
                  >
                    {submitStatus.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
