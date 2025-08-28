 import React, { useState } from 'react';
import { Instagram, Menu, X } from 'lucide-react';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-4">
        <a
          href="https://novahypnose.fr/"
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 text-hypno-primary hover:text-hypno-accent transition-colors"
        >
          NovaHypnose
        </a>
        
        <a
          href="https://novahypnose.fr/#about"
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 text-hypno-primary hover:text-hypno-accent transition-colors"
        >
          À propos
        </a>
        
        <a
          href="https://emergences.novahypnose.fr/"
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 text-hypno-primary hover:text-hypno-accent transition-colors"
        >
          Emergences le Blog
        </a>
        
        <a
          href="https://www.instagram.com/novahypnose/"
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 text-hypno-primary hover:text-hypno-accent transition-colors flex items-center gap-1"
        >
          <Instagram className="h-4 w-4" />
          Instagram
        </a>
        
        <a
          href="https://play.google.com/store/apps/details?id=com.novahypnose.novarespire&pcampaignid=web_share"
          target="_blank" 
          rel="noopener noreferrer"
          className="px-2 py-1 hover:opacity-80 transition-opacity"
          title="NovaRespire - App respiration"
        >
          <img 
            src="/google-play-badge.svg" 
            alt="Télécharger NovaRespire sur Google Play" 
            className="h-9 w-auto"
          />
        </a>
        
        <a
          href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-hypno-accent text-white hover:bg-hypno-primary transition-colors rounded-md font-semibold"
        >
          Rendez-vous
        </a>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Menu Button */}
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md text-hypno-primary hover:text-hypno-accent hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={closeMenu}
            />
            
            {/* Menu Panel */}
            <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-xl overflow-y-auto">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-white">
                  <span className="text-lg font-semibold text-hypno-primary">Menu</span>
                  <button
                    onClick={closeMenu}
                    className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 p-4">
                  <div className="space-y-3">
                    <a
                      href="https://novahypnose.fr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="flex items-center p-4 rounded-lg text-hypno-primary hover:text-hypno-accent hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      NovaHypnose
                    </a>
                    
                    <a
                      href="https://novahypnose.fr/#about"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="flex items-center p-4 rounded-lg text-hypno-primary hover:text-hypno-accent hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      À propos
                    </a>
                    
                    <a
                      href="https://emergences.novahypnose.fr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="flex items-center p-4 rounded-lg text-hypno-primary hover:text-hypno-accent hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      Emergences le Blog
                    </a>
                    
                    <a
                      href="https://www.instagram.com/novahypnose/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="flex items-center gap-3 p-4 rounded-lg text-hypno-primary hover:text-hypno-accent hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </a>
                    
                    <a
                      href="https://play.google.com/store/apps/details?id=com.novahypnose.novarespire&pcampaignid=web_share"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
                      title="NovaRespire - App respiration"
                    >
                      <img 
                        src="/google-play-badge.svg" 
                        alt="Télécharger NovaRespire sur Google Play" 
                        className="h-8 w-auto"
                      />
                      <span className="text-hypno-primary">NovaRespire App</span>
                    </a>
                    
                    <a
                      href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="flex items-center p-4 rounded-lg bg-hypno-accent text-white hover:bg-hypno-primary transition-colors w-full text-left font-semibold"
                    >
                      Rendez-vous
                    </a>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t bg-gray-50">
                  <p className="text-sm text-gray-600 text-center">
                    © 2024 HypnoKick
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavMenu;
