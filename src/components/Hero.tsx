
import { ArrowRight, Github, Linkedin, Mail, Upload } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import ThreeScene from "./three/ThreeScene";
import { toast } from "@/components/ui/use-toast";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [modelPath, setModelPath] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is a GLTF or GLB file
    if (!file.name.endsWith('.gltf') && !file.name.endsWith('.glb')) {
      toast({
        title: "Invalid file format",
        description: "Please upload a GLTF or GLB file",
        variant: "destructive"
      });
      return;
    }

    // Create a URL for the file
    const url = URL.createObjectURL(file);
    setModelPath(url);
    
    toast({
      title: "Model loaded",
      description: `Loaded model: ${file.name}`,
      variant: "default"
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-gradient-to-br from-white to-soft-purple/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between w-full">
        <div
          className={cn(
            "w-full md:w-1/2 space-y-6 transition-all duration-700 ease-out transform",
            loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}
        >
          <div className="space-y-2">
            <p className="text-lavender font-medium tracking-wide">Blockchain Developer</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              Muhammed Anas <span className="text-lavender">KP</span>
            </h1>
          </div>

          <p className="text-lg text-muted-foreground max-w-md">
            Specialized in Blockchain Development with a focus on Ethereum, Solana, and cross-chain 
            technologies. Building the future of Web3, one block at a time.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary flex items-center gap-2">
              View Projects <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-outline">
              Contact Me
            </a>
            <button 
              onClick={handleUploadClick}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-lavender text-lavender hover:bg-lavender/10 transition-colors"
            >
              <Upload size={18} />
              Upload 3D Model
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".gltf,.glb"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://github.com/anskp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-lavender transition-colors"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-lavender transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="mailto:anaskoyakkara@gmail.com"
              className="text-muted-foreground hover:text-lavender transition-colors"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>

        <div
          className={cn(
            "w-full md:w-1/2 mt-12 md:mt-0 transition-all duration-700 ease-out transform",
            loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}
        >
          <div className="scene-container glass relative">
            <div className="absolute inset-0 bg-gradient-purple opacity-10 rounded-xl"></div>
            <div className="overlay-text absolute top-4 left-4 right-4 text-center text-sm text-muted-foreground pointer-events-none">
              Click on the computer screen to view details
            </div>
            <div className="flex h-full w-full p-4">
              <div className="w-full h-full">
                <ThreeScene modelPath={modelPath} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
