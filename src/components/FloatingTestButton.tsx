
import React from 'react';
import { Brain } from "lucide-react";

type FloatingTestButtonProps = {
  show: boolean;
  onClick: () => void;
};

const FloatingTestButton = ({ show, onClick }: FloatingTestButtonProps) => {
  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      }`}
    >
      <button
        onClick={onClick}
        className="bg-hypno-accent hover:bg-hypno-primary text-white shadow-lg rounded-full px-6 py-4 flex items-center gap-2 font-semibold text-base"
      >
        <Brain className="h-5 w-5" />
        <span className="hidden sm:inline">Test Gratuit</span>
        <span className="sm:hidden">Test</span>
      </button>
    </div>
  );
};

export default FloatingTestButton;
