 import React, { useState } from 'react';
import { Instagram, Menu, X } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { href: 'https://novahypnose.fr/', label: 'NovaHypnose' },
    { href: 'https://novahypnose.fr/#about', label: 'À propos' },
    { href: 'https://emergences.novahypnose.fr/', label: 'Emergences' },
    { 
      href: 'https://www.instagram.com/novahypnose/', 
      label: 'Instagram', 
      icon: <Instagram className="h-4 w-4" />
    },
    { 
      href: 'https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris', 
      label: 'Rendez-vous',
      isButton: true
    }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-4">
            {menuItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink 
                  href={item.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    item.isButton 
                      ? "bg-hypno-accent text-white hover:bg-hypno-primary"
                      : "text-hypno-primary hover:text-hypno-accent",
                    item.icon && "flex items-center gap-1"
                  )}
                >
                  {item.icon}
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

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
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleMenu}
            />
            
            {/* Menu Panel */}
            <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <span className="text-lg font-semibold text-hypno-primary">Menu</span>
                  <button
                    onClick={toggleMenu}
                    className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 p-4">
                  <ul className="space-y-3">
                    {menuItems.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={toggleMenu}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg transition-colors text-left w-full",
                            item.isButton
                              ? "bg-hypno-accent text-white hover:bg-hypno-primary"
                              : "text-hypno-primary hover:text-hypno-accent hover:bg-gray-50"
                          )}
                        >
                          {item.icon}
                          <span className="font-medium">{item.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t bg-gray-50">
                  <p className="text-sm text-gray-600 text-center">
                    © 2024 HypnoKick
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NavMenu;
