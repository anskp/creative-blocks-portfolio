
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo?: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Ethereum DApp",
    description: "A decentralized application built on Ethereum blockchain using Solidity.",
    technologies: ["Solidity", "React", "Ethers.js", "Hardhat"],
    github: "https://github.com/anskp",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Solana Program",
    description: "A Rust-based Solana program with React frontend integration.",
    technologies: ["Rust", "Anchor", "React", "Solana Web3.js"],
    github: "https://github.com/anskp",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Cross-Chain Bridge",
    description: "Implementation of a cross-chain bridge using Wormhole protocol.",
    technologies: ["Solidity", "Rust", "Wormhole", "React"],
    github: "https://github.com/anskp",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Smart Contract Audit Tool",
    description: "A tool for auditing smart contracts for security vulnerabilities.",
    technologies: ["Solidity", "TypeScript", "Node.js"],
    github: "https://github.com/anskp",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    title: "NFT Marketplace",
    description: "A decentralized marketplace for NFTs with metadata storage.",
    technologies: ["Solidity", "IPFS", "React", "Ethers.js"],
    github: "https://github.com/anskp",
    image: "/placeholder.svg",
  },
];

export interface Skill {
  category: string;
  items: string[];
}

export const skills: Skill[] = [
  {
    category: "Blockchain",
    items: ["Solidity", "Rust", "Wormhole", "Web3.js", "Ethers.js", "Anchor"],
  },
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Material UI"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
  },
  {
    category: "3D & Design",
    items: ["Three.js", "Blender", "Figma"],
  },
];

export const experiences = [
  {
    title: "Blockchain Developer",
    company: "Freelance",
    period: "2022 - Present",
    description: "Developing smart contracts and dApps for various blockchain platforms including Ethereum and Solana. Implementing cross-chain solutions using Wormhole.",
  },
  {
    title: "Computer Science Engineering",
    company: "University",
    period: "2020 - 2024",
    description: "Studying Computer Science with a focus on blockchain technology, distributed systems, and full-stack development.",
  },
];
