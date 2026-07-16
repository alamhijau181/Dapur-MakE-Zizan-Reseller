import React from "react";
import { ShoppingBag, Phone, Menu, X, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DapurMakeZizanLogo } from "./DapurMakeZizanLogo";

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({ onScrollToSection }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: "Beranda", id: "home" },
    { name: "Keuntungan", id: "benefits" },
    { name: "Menu Reseller", id: "menu" },
    { name: "Kalkulator Order", id: "calculator" },
    { name: "Testimoni", id: "testimonials" },
    { name: "F.A.Q", id: "faq" },
  ];

  return (
    <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div className="bg-brand-card p-4 rounded-2xl border border-brand-orange/30 shadow-lg backdrop-blur-md bg-opacity-95">
        <div className="flex items-center justify-between h-14">
          {/* Logo Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <DapurMakeZizanLogo size={48} className="hover:scale-105 transition-transform duration-300" />
            <div>
              <h1 className="text-sm sm:text-lg font-black text-brand-orange tracking-tight uppercase flex items-center gap-1">
                Dapur Mak'e Zizan
              </h1>
              <p className="text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-widest font-bold flex items-center gap-1">
                <Award className="w-3 h-3 text-brand-orange shrink-0" /> Premium Homemade
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onScrollToSection(link.id)}
                className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-brand-orange transition-colors duration-200 cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Call to Action */}
          <div className="hidden md:flex items-center gap-4">
            <span className="px-3 py-1 bg-brand-orange/10 border border-brand-orange text-brand-orange rounded-full text-[10px] font-bold uppercase tracking-tighter">
              Open Reseller Now
            </span>
            <button
              onClick={() => onScrollToSection("calculator")}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white font-bold text-xs hover:bg-green-500 transition-all duration-300 cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              WhatsApp Order
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-brand-muted transition-colors"
            >
              {isOpen ? <X className="w-6 h-6 text-brand-orange" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-brand-muted bg-brand-card"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onScrollToSection(link.id);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-brand-muted transition-all"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 px-4">
                <button
                  onClick={() => {
                    onScrollToSection("calculator");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-orange text-brand-dark font-bold hover:bg-brand-orange-dark transition-all shadow-[0_4px_12px_rgba(249,115,22,0.3)]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Kalkulator Order
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
