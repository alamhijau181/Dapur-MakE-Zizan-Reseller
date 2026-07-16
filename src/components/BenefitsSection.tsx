import React from "react";
import { TrendingUp, Award, Sparkles, Image, CheckCircle, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { RESELLER_BENEFITS } from "../data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp: TrendingUp,
  Award: Award,
  Sparkles: Sparkles,
  Image: Image,
};

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-24 bg-black border-b border-brand-muted relative overflow-hidden isolate">
      {/* Background flare */}
      <div className="hidden md:block absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-brand-orange/5 rounded-full blur-xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-black tracking-widest uppercase">
            Keuntungan Mitra Reseller
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white italic uppercase mt-4 mb-2">
            MENGAPA MEMILIH <span className="text-brand-orange">MAK'E ZIZAN</span>?
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light uppercase tracking-wider">
            Layanan terbaik, margin melimpah, rasa bintang lima.
          </p>
        </div>

        {/* Asymmetric Bento Grid of 4 Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {RESELLER_BENEFITS.map((benefit, idx) => {
            const IconComponent = iconMap[benefit.icon] || ShieldCheck;
            // Alternate widths: 1st/4th card small (col-span-5), 2nd/3rd card large (col-span-7)
            const gridClass = idx === 0 || idx === 3 
              ? "md:col-span-5 flex flex-col justify-between" 
              : "md:col-span-7 flex flex-col justify-between";
              
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`${gridClass} p-8 rounded-3xl bg-brand-card border border-brand-border-light hover:border-brand-orange/30 hover:scale-[1.01] transition-all duration-300 group shadow-lg`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 group-hover:bg-brand-orange/20 flex items-center justify-center text-brand-orange mb-6 transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-3 group-hover:text-brand-orange transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-brand-border-light/40 flex items-center justify-between text-xs text-brand-orange font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Mitra Mak'e Zizan</span>
                  <span>🔥</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reseller Discount Tiers Visualizer - Big Bento Card */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-brand-card border border-brand-border-light shadow-2xl relative overflow-hidden group">
          <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-brand-orange/[0.02] rounded-full blur-xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <span className="text-[10px] text-brand-orange font-black uppercase tracking-widest">
                TRANSAKSI LANGSUNG
              </span>
              <h3 className="text-3xl font-black text-white uppercase italic mt-2 mb-4">
                KETENTUAN & <span className="text-brand-orange">POTONGAN RESELLER</span>
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
                Sistem diskon kami sangat transparan. Potongan langsung dihitung per macam item dalam satu transaksi (tidak berlaku akumulasi beda hari atau mix item berbeda).
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                  <span>Sistem transaksi langsung (berlaku max 1x24 jam).</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                  <span>Tidak berlaku akumulasi beberapa hari.</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                  <span>Potongan harga berlaku kelipatan pembelian item sejenis.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-brand-dark/60 border border-brand-border-light text-center relative overflow-hidden group hover:border-brand-orange/40 transition-all duration-300">
                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Beli 5 Potong</p>
                <p className="text-4xl font-black text-brand-orange my-3">10%</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Potongan Langsung</p>
              </div>

              <div className="p-6 rounded-2xl bg-brand-dark/60 border border-brand-border-light text-center relative overflow-hidden group hover:border-brand-orange/40 transition-all duration-300">
                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Beli 10 Potong</p>
                <p className="text-4xl font-black text-brand-orange my-3">15%</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Potongan Langsung</p>
              </div>

              <div className="p-6 rounded-2xl bg-brand-dark/60 border border-brand-border-light text-center relative overflow-hidden group hover:border-brand-orange/40 transition-all duration-300">
                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Beli 25 Potong</p>
                <p className="text-4xl font-black text-brand-orange my-3">20%</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Potongan Langsung*</p>
                <span className="text-[8px] text-gray-500 block mt-2 font-medium">*Tidak berlaku Pizza Long</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
