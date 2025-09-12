import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Toaster />
      <Sonner />
    </div>
  );
};

export default Layout;