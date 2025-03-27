
import React from "react";

interface ProfileDetailProps {
  onClose: () => void;
}

export const ProfileDetail: React.FC<ProfileDetailProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 bg-lavender text-white p-8 flex flex-col items-center justify-center bg-opacity-90 z-10 overflow-auto">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold">
          Muhammed Anas KP
        </h1>
        <p className="text-xl">Blockchain Developer</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-8">
          <div className="bg-white/10 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <ul className="space-y-2">
              <li>• Smart Contract Development</li>
              <li>• Cross-Chain Solutions (Wormhole)</li>
              <li>• Solidity & Rust Programming</li>
              <li>• Web3 Integration</li>
              <li>• DeFi Protocols</li>
            </ul>
          </div>
          
          <div className="bg-white/10 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="mb-2">
              <strong>Email:</strong> anaskoyakkara@gmail.com
            </p>
            <p className="mb-2">
              <strong>GitHub:</strong> github.com/anskp
            </p>
            <p>
              <strong>Education:</strong> Computer Science Engineering
            </p>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="mt-8 bg-white text-lavender font-medium px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Return to 3D View
        </button>
      </div>
    </div>
  );
};
