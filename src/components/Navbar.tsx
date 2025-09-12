import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Heart, MessageCircle, Bot, Stethoscope, DollarSign, User, Settings } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Heart },
    { name: "My Oasis", href: "/dashboard", icon: User },
    { name: "Chats", href: "/chats", icon: MessageCircle },
    { name: "FINN AI", href: "/finn", icon: Bot },
    { name: "Experts", href: "/experts", icon: Stethoscope },
    { name: "Support", href: "/crowdfunding", icon: DollarSign },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-success animate-gentle-pulse"></div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Echo</h1>
            <p className="text-xs text-muted-foreground">Voices that Grow</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.name} to={item.href}>
                <Button 
                  variant={isActive(item.href) ? "default" : "ghost"}
                  className={`relative ${isActive(item.href) 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                  {isActive(item.href) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-foreground rounded-full"></div>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <Badge className="bg-success/10 text-success border-success/20">
            🌱 256 Seeds
          </Badge>
          <Button size="sm" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-4 mt-8">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-success"></div>
                <div>
                  <h2 className="font-semibold text-foreground">Echo</h2>
                  <p className="text-xs text-muted-foreground">Voices that Grow</p>
                </div>
              </div>
              
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.name} 
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button 
                      variant={isActive(item.href) ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
              
              <div className="pt-4 border-t">
                <Badge className="bg-success/10 text-success border-success/20 mb-4 block text-center">
                  🌱 256 Seeds
                </Badge>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;