import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BenefitsSection from "./components/BenefitsSection";
import MenuSection from "./components/MenuSection";
import ResellerCalculator from "./components/ResellerCalculator";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function App() {
  // State to track if an item has been selected from the catalog to add to the calculator
  const [selectedItemIdFromMenu, setSelectedItemIdFromMenu] = React.useState<string | null>(null);
  const [activeSection, setActiveSection] = React.useState("home");

  const isProgrammaticScrollRef = React.useRef(false);
  const scrollTimeoutRef = React.useRef<any>(null);

  // Helper to find absolute offsetTop of an element relative to the document body
  const getAbsoluteOffsetTop = (element: HTMLElement): number => {
    let top = 0;
    let curr: HTMLElement | null = element;
    while (curr) {
      top += curr.offsetTop;
      curr = curr.offsetParent as HTMLElement;
    }
    return top;
  };

  // Track active section on scroll
  React.useEffect(() => {
    const sections = ["home", "benefits", "menu", "calculator", "testimonials", "faq"];
    
    const handleScroll = () => {
      // If we are currently programmatically scrolling, ignore standard scroll spy triggers
      if (isProgrammaticScrollRef.current) return;

      const scrollPosition = window.scrollY + 180; // offset threshold (header + spacing)
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = getAbsoluteOffsetTop(el);
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once initially to set the correct section
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Precise coordinate smooth scroll helper
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // 1. Temporarily disable scroll spy to prevent middle sections from triggering activeSection updates during transitions
      isProgrammaticScrollRef.current = true;
      setActiveSection(sectionId);

      // 2. Perform smooth scroll calculation using the absolute offset top
      const headerOffset = 90; // Floating header height + spacing
      const absoluteTop = getAbsoluteOffsetTop(element);
      const offsetPosition = absoluteTop - headerOffset;

      window.scrollTo({
        top: offsetPosition >= 0 ? offsetPosition : 0,
        behavior: "smooth"
      });

      // 3. Clear existing timeout and set new one to re-enable scroll spy after transition finishes
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 800); // 800ms is perfectly timed for browser smooth scroll completion
    }
  };

  // Callback to add item to the calculator
  const handleAddToCalculator = (itemId: string) => {
    setSelectedItemIdFromMenu(itemId);
    handleScrollToSection("calculator");
  };

  const handleClearSelectedMenuId = () => {
    setSelectedItemIdFromMenu(null);
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col antialiased selection:bg-brand-orange selection:text-brand-dark">
      {/* Navigation Header */}
      <Header onScrollToSection={handleScrollToSection} activeSection={activeSection} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onScrollToSection={handleScrollToSection} />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Menu Catalog Section */}
        <MenuSection onAddToCalculator={handleAddToCalculator} />

        {/* Real-time Order & Profit Calculator Section */}
        <ResellerCalculator 
          selectedItemIdFromMenu={selectedItemIdFromMenu} 
          clearSelectedMenuId={handleClearSelectedMenuId} 
        />

        {/* Testimonials and FAQ */}
        <Testimonials />
      </main>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
