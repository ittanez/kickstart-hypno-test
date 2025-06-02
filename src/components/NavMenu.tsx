 import React from 'react';
import { Instagram } from 'lucide-react';
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
import { Link } from 'react-router-dom';

const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex items-center space-x-4">
        <NavigationMenuItem>
          <NavigationMenuLink 
            href="https://novahypnose.fr/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn(navigationMenuTriggerStyle(), "text-hypno-primary hover:text-hypno-accent")}
          >
            NovaHypnose
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink 
            href="https://novahypnose.fr/#about" 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn(navigationMenuTriggerStyle(), "text-hypno-primary hover:text-hypno-accent")}
          >
            À propos
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink 
            href="https://emergences.novahypnose.fr/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn(navigationMenuTriggerStyle(), "text-hypno-primary hover:text-hypno-accent")}
          >
            Emergences le Blog
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink 
            href="https://www.instagram.com/novahypnose/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn(navigationMenuTriggerStyle(), "text-hypno-primary hover:text-hypno-accent flex items-center")}
          >
            <Instagram className="h-4 w-4 mr-1" />
            <span className="sr-only md:not-sr-only">Instagram</span>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink 
            href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris" 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn(navigationMenuTriggerStyle(), "bg-hypno-accent text-white hover:bg-hypno-primary")}
          >
            Rendez-vous
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
