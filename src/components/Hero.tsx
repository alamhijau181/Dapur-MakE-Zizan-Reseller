import React from "react";
import { ArrowRight, Sparkles, Award, Users, Percent, Flame } from "lucide-react";
import { motion } from "motion/react";
import bolenImg from "../assets/images/regenerated_image_1784179149983.jpg";
import { DapurMakeZizanLogo } from "./DapurMakeZizanLogo";

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  return (
    <section id="home" className="relative py-20 lg:py-32 overflow-hidden border-b border-brand-muted isolate">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <img
          src={bolenImg}
          alt="Rustic Kitchen"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-dark/90"></div>
      </div>

      {/* Decorative Radial Gradient */}
      <div className="hidden md:block absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-orange/5 rounded-full blur-xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Main narrative and core welcome (Left - Col Span 7) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-brand-card rounded-3xl p-8 sm:p-10 border border-brand-border-light flex flex-col justify-between relative overflow-hidden group hover:border-brand-orange/30 transition-all duration-300 shadow-2xl"
          >
            {/* Background spotlight */}
            <div className="hidden md:block absolute top-0 right-0 w-48 h-48 bg-brand-orange/5 rounded-full blur-xl pointer-events-none group-hover:bg-brand-orange/10 transition-colors"></div>

            <div>
              <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-start gap-6 mb-6">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-black tracking-widest uppercase mb-4">
                    <Flame className="w-3.5 h-3.5 animate-pulse" />
                    Dapur Mak'e Zizan Open Reseller
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.05] uppercase italic mb-4">
                    GABUNG RESELLER,<br />
                    DAPETIN <span className="text-brand-orange">HARGA SPESIAL</span> & UNTUNG MELIMPAH!
                  </h2>
                </div>
                <div className="shrink-0 self-center sm:self-start bg-brand-dark/30 p-3 rounded-3xl border border-brand-border-light shadow-xl">
                  <DapurMakeZizanLogo size={96} className="hover:scale-105 hover:rotate-3 transition-transform duration-300" />
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xl mb-8">
                Yuk gabung menjadi reseller resmi <strong className="text-brand-orange font-semibold">Dapur Mak'e Zizan</strong>! Dapatkan keleluasaan berbisnis kuliner dengan diskon langsung hingga <span className="text-brand-orange font-bold">20% OFF</span> per macam item tanpa ribet, tanpa modal besar, dan dipanggang fresh setiap hari.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-auto pt-6 border-t border-brand-border-light">
              <button
                onClick={() => onScrollToSection("calculator")}
                className="px-6 py-4 rounded-xl bg-brand-orange text-brand-dark font-black text-xs uppercase tracking-wider hover:bg-brand-orange-dark hover:scale-[1.02] transition-all duration-300 shadow-[0_8px_24px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                Simulasi Keuntungan <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onScrollToSection("menu")}
                className="px-6 py-4 rounded-xl border border-brand-muted bg-brand-dark text-gray-300 font-bold text-xs uppercase tracking-wider hover:border-brand-orange/40 hover:bg-brand-card transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Lihat Menu Produk
              </button>
            </div>
          </motion.div>

          {/* Bento Card 2: Promotional Highlight with Orange Gradient (Right - Col Span 5) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 bg-gradient-to-br from-brand-orange-dark to-orange-950 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between group shadow-2xl border border-brand-orange/20"
          >
            {/* Background decorative circles */}
            <div className="hidden md:block absolute -right-8 -bottom-8 w-32 h-32 bg-black/10 rounded-full blur-xl"></div>
            
            <div className="z-10">
              <span className="px-3 py-1 bg-white/10 border border-white/20 text-white rounded-full text-[9px] font-bold uppercase tracking-wider">
                Skema Potongan Harga
              </span>
              <h3 className="text-3xl sm:text-4xl font-black leading-none italic uppercase text-white mt-4 mb-2">
                GASKEUUNNN<br />RESELLER! 🔥
              </h3>
              <p className="text-xs text-white/85 font-light max-w-[280px]">
                Makin banyak beli, potongan harga makin melimpah langsung dipotong saat transaksi.
              </p>
            </div>

            {/* Discount tiers grid */}
            <div className="z-10 bg-black/50 p-4 rounded-2xl border border-white/10 mt-6">
              <p className="text-[9px] uppercase font-bold tracking-widest text-white/60 mb-2.5">
                POTONGAN RESELLER AKTIF
              </p>
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                  <div className="text-xl font-black text-brand-orange">10%</div>
                  <div className="text-[8px] uppercase tracking-wider text-white/70 font-bold">Beli 5</div>
                </div>
                <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                  <div className="text-xl font-black text-brand-orange">15%</div>
                  <div className="text-[8px] uppercase tracking-wider text-white/70 font-bold">Beli 10</div>
                </div>
                <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                  <div className="text-xl font-black text-brand-orange">20%</div>
                  <div className="text-[8px] uppercase tracking-wider text-white/70 font-bold">Beli 25</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 3: Best Seller showcase (Row 2 - Col Span 6) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-6 bg-brand-card rounded-3xl p-6 sm:p-8 border border-brand-border-light flex flex-col sm:flex-row gap-6 relative overflow-hidden group shadow-2xl"
          >
            <div className="sm:w-1/2 relative rounded-2xl overflow-hidden h-48 sm:h-auto bg-brand-muted">
              <img
                src={bolenImg}
                alt="Bolen Pisang Mak'e Zizan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-brand-orange text-brand-dark font-black px-2 py-0.5 rounded text-[9px] uppercase tracking-widest shadow-md">
                Best Seller
              </span>
            </div>

            <div className="sm:w-1/2 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-black text-brand-orange uppercase italic leading-none mb-1">
                  Bolen Pisang
                </h3>
                <p className="text-[11px] text-gray-400 font-medium mb-3">Isi 8 Pcs/Box • Kulit Pastry Premium</p>
                <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                  Pisang legit manis bertabur keju & coklat melimpah. Rasa orisinal Dapur Mak'e Zizan yang tak tertandingi!
                </p>
              </div>

              <div className="flex items-baseline justify-between pt-4 border-t border-brand-border-light">
                <div>
                  <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Harga Normal</span>
                  <p className="text-xs text-gray-400 line-through">Rp 40.000</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-brand-orange uppercase font-bold tracking-wider">Spesial Reseller</span>
                  <p className="text-3xl font-black text-white">35K <span className="text-xs font-normal text-gray-400">/box</span></p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 4: Stats Summary and Trust Indicators (Row 2 - Col Span 6) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-6 bg-brand-card rounded-3xl p-6 sm:p-8 border border-brand-border-light flex flex-col sm:grid sm:grid-cols-3 gap-4 items-center relative overflow-hidden group shadow-2xl"
          >
            <div className="w-full text-center p-4 rounded-2xl bg-brand-dark/50 border border-brand-border-light">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mx-auto mb-2.5">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-2xl font-black text-white">50+</p>
              <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">Reseller Aktif</p>
            </div>

            <div className="w-full text-center p-4 rounded-2xl bg-brand-dark/50 border border-brand-border-light">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mx-auto mb-2.5">
                <Percent className="w-5 h-5" />
              </div>
              <p className="text-2xl font-black text-brand-orange">s/d 20%</p>
              <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">Diskon Pembelian</p>
            </div>

            <div className="w-full text-center p-4 rounded-2xl bg-brand-dark/50 border border-brand-border-light">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mx-auto mb-2.5">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-2xl font-black text-white">100%</p>
              <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">Freshly Baked</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
