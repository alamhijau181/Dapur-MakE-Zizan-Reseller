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

  // Smooth scroll helper
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Callback to add item to the calculator
  const handleAddToCalculator = (itemId: string) => {
    setSelectedItemIdFromMenu(itemId);
  };

  const handleClearSelectedMenuId = () => {
    setSelectedItemIdFromMenu(null);
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col antialiased selection:bg-brand-orange selection:text-brand-dark">
      {/* Navigation Header */}
      <Header onScrollToSection={handleScrollToSection} />

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
