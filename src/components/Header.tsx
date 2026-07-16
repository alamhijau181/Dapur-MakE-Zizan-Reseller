import React from "react";
import { 
  Home, 
  TrendingUp, 
  UtensilsCrossed, 
  Calculator, 
  MessageSquare, 
  HelpCircle, 
  ShoppingBag, 
  Menu, 
  X, 
  Award 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DapurMakeZizanLogo } from "./DapurMakeZizanLogo";

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onScrollToSection, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: "Beranda", id: "home", icon: Home },
    { name: "Keuntungan", id: "benefits", icon: TrendingUp },
    { name: "Menu", id: "menu", icon: UtensilsCrossed },
    { name: "Kalkulator", id: "calculator", icon: Calculator },
    { name: "Testimoni", id: "testimonials", icon: MessageSquare },
    { name: "F.A.Q", id: "faq", icon: HelpCircle },
  ];

  return (
    <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      {/* Outer Capsule with modern Glassmorphism */}
      <div className="relative bg-black/80 backdrop-blur-md p-3 px-4 sm:px-6 rounded-2xl border border-brand-orange/20 shadow-[0_8px_32px_rgba(249,115,22,0.08)] transition-all duration-300">
        <div className="flex items-center justify-between h-14 gap-4">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <DapurMakeZizanLogo size={46} className="hover:scale-105 transition-transform duration-300 cursor-pointer" />
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-black text-brand-orange tracking-tight uppercase whitespace-nowrap">
                Dapur Mak'e Zizan
              </h1>
              <p className="text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-widest font-bold flex items-center gap-1 whitespace-nowrap">
                <Award className="w-3 h-3 text-brand-orange shrink-0" /> Premium Homemade
              </p>
            </div>
          </div>

          {/* Desktop/Tablet Navigation with Sliding Background Indicator */}
          <nav className="hidden lg:flex items-center bg-brand-muted/40 p-1.5 rounded-full border border-white/[0.04]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const LinkIcon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => onScrollToSection(link.id)}
                  className="relative px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  {/* Sliding Background Highlight */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavigationTab"
                      className="absolute inset-0 bg-brand-orange rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {/* Content Container on Top of Indicator */}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <LinkIcon className={`w-3.5 h-3.5 transition-colors duration-300 ${isActive ? "text-brand-dark" : "text-gray-400"}`} />
                    <span className={`transition-colors duration-300 ${isActive ? "text-brand-dark font-black" : "text-gray-300 hover:text-white"}`}>
                      {link.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => onScrollToSection("calculator")}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange text-brand-dark font-extrabold text-xs hover:bg-brand-orange-dark hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer shadow-[0_4px_12px_rgba(249,115,22,0.2)]"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              WhatsApp Order
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onScrollToSection("calculator")}
              className="p-2.5 rounded-full bg-brand-orange text-brand-dark hover:scale-105 transition-all cursor-pointer"
              title="Kalkulator Order"
            >
              <Calculator className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-brand-muted/80 transition-colors cursor-pointer border border-white/[0.04]"
            >
              {isOpen ? <X className="w-6 h-6 text-brand-orange" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel - High Fidelity Dropdown Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-[calc(100%+8px)] left-0 right-0 lg:hidden bg-black/95 backdrop-blur-xl border border-brand-orange/20 rounded-2xl p-4 shadow-[0_12px_40px_rgba(249,115,22,0.15)] z-50 overflow-hidden"
            >
              <div className="space-y-1 pb-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  const LinkIcon = link.icon;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        onScrollToSection(link.id);
                        setIsOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? "bg-brand-orange/10 text-brand-orange border-l-4 border-brand-orange pl-3.5"
                          : "text-gray-300 hover:text-white hover:bg-brand-muted/50"
                      }`}
                    >
                      <LinkIcon className={`w-4 h-4 ${isActive ? "text-brand-orange" : "text-gray-400"}`} />
                      {link.name}
                    </button>
                  );
                })}
                <div className="pt-3 border-t border-brand-muted/40 mt-3">
                  <button
                    onClick={() => {
                      onScrollToSection("calculator");
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-orange text-brand-dark font-extrabold hover:bg-brand-orange-dark transition-all shadow-[0_4px_12px_rgba(249,115,22,0.3)] cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Buka Kalkulator Order
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
