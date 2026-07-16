import React from "react";
import { MenuItem, MenuCategory } from "../types";
import { MENU_ITEMS } from "../data";
import { Check, Plus, Percent, Heart, MessageSquarePlus } from "lucide-react";
import { motion } from "motion/react";

interface MenuSectionProps {
  onAddToCalculator: (itemId: string) => void;
}

export default function MenuSection({ onAddToCalculator }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = React.useState<MenuCategory | "All">("All");

  const filteredItems = React.useMemo(() => {
    if (activeCategory === "All") return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="menu" className="py-24 bg-black border-b border-brand-muted relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-black tracking-widest uppercase">
            Katalog Menu Reseller
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white italic uppercase mt-4 mb-2">
            PILIHAN MENU LEZAT <span className="text-brand-orange">MITRA ANDA</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light uppercase tracking-wider">
            Dibuat fresh setiap hari menggunakan bahan halal premium & terpilih.
          </p>
        </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                activeCategory === "All"
                  ? "bg-brand-orange text-brand-dark border-brand-orange shadow-[0_4px_12px_rgba(249,115,22,0.25)]"
                  : "bg-brand-card text-gray-400 border-brand-muted hover:border-gray-600 hover:text-white"
              }`}
            >
              Semua Menu
            </button>
            <button
              onClick={() => setActiveCategory(MenuCategory.Pastry)}
              className={`px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                activeCategory === MenuCategory.Pastry
                  ? "bg-brand-orange text-brand-dark border-brand-orange shadow-[0_4px_12px_rgba(249,115,22,0.25)]"
                  : "bg-brand-card text-gray-400 border-brand-muted hover:border-gray-600 hover:text-white"
              }`}
            >
              Kategori Pastry
            </button>
            <button
              onClick={() => setActiveCategory(MenuCategory.Pizza)}
              className={`px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                activeCategory === MenuCategory.Pizza
                  ? "bg-brand-orange text-brand-dark border-brand-orange shadow-[0_4px_12px_rgba(249,115,22,0.25)]"
                  : "bg-brand-card text-gray-400 border-brand-muted hover:border-gray-600 hover:text-white"
              }`}
            >
              Kategori Pizza
            </button>
          </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex flex-col rounded-3xl bg-brand-card border border-brand-border-light overflow-hidden hover:border-brand-orange/40 hover:shadow-[0_10px_30px_rgba(249,115,22,0.08)] transition-all duration-300 group"
            >
              {/* Product Image Panel */}
              <div className="relative h-52 overflow-hidden bg-brand-muted">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card/90 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-dark/95 text-[10px] font-extrabold uppercase tracking-widest text-brand-orange border border-brand-orange/20">
                  {item.category}
                </span>

                {/* Spec summary badge (e.g. "Isi 8/box") */}
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-brand-orange text-brand-dark text-[10px] font-black uppercase tracking-widest shadow-md">
                  {item.id === "bolen" || item.id === "sus-buah" ? "8 Pcs/Box" : item.id === "pizza" ? "Loyang 20cm" : "Super 40x20cm"}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-2 group-hover:text-brand-orange transition-colors duration-200">
                  {item.name}
                </h3>
                
                <p className="text-xs text-gray-400 font-light line-clamp-2 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Bullet Specs */}
                <div className="space-y-1.5 mb-5 flex-1">
                  {item.specs.slice(0, 3).map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <Check className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                  {item.options && (
                    <div className="text-[11px] text-brand-orange font-medium mt-2 flex items-center gap-1.5 bg-brand-orange/5 border border-brand-orange/10 px-2.5 py-1.5 rounded-lg">
                      <span>💡 Pilihan: {item.options.join(", ")}</span>
                    </div>
                  )}
                  {item.customMessageCost && (
                    <div className="text-[11px] text-green-400 font-medium mt-1.5 flex items-center gap-1.5 bg-green-500/5 border border-green-500/10 px-2.5 py-1.5 rounded-lg">
                      <MessageSquarePlus className="w-3 h-3" />
                      <span>Bisa tambah ucapan (+Rp 4k)</span>
                    </div>
                  )}
                </div>

                {/* Price section */}
                <div className="pt-4 border-t border-brand-muted/80 mt-auto">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs text-gray-400 font-medium">Harga Reseller</span>
                    <span className="text-2xl font-black text-white">
                      Rp {item.resellerPrice.toLocaleString("id-ID")}<span className="text-xs font-normal text-gray-400">/unit</span>
                    </span>
                  </div>

                  {/* Bulk Discount Badges Slider */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.bulkDiscounts.map((disc, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-extrabold bg-brand-orange/10 border border-brand-orange/20 text-brand-orange px-2 py-0.5 rounded-md flex items-center gap-0.5"
                      >
                        <Percent className="w-2.5 h-2.5" /> Qty {disc.minQty}+: -{disc.discountPercent}%
                      </span>
                    ))}
                  </div>

                  {/* Add To Simulator CTA */}
                  <button
                    onClick={() => onAddToCalculator(item.id)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-muted hover:bg-brand-orange hover:text-brand-dark text-white font-bold text-sm transition-all duration-300 border border-brand-muted hover:border-brand-orange cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah ke Kalkulator
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
