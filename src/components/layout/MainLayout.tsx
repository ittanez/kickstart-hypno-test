
import React from 'react';
import NavMenu from '@/components/NavMenu';

type MainLayoutProps = {
  children: React.ReactNode;
  onLogoClick?: () => void;
  showBackButton?: boolean;
};

const MainLayout = ({ children, onLogoClick, showBackButton = false }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header responsive */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo cliquable */}
            <div className="flex items-center">
              <button 
                onClick={onLogoClick}
                className="text-xl sm:text-2xl font-bold text-hypno-primary hover:text-hypno-accent transition-colors cursor-pointer"
              >
                HypnoKick
              </button>
            </div>
            
            {/* Navigation */}
            <NavMenu />
          </div>
        </div>
      </header>
      
      <main>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
