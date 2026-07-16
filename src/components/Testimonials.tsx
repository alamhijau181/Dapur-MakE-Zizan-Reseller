import React from "react";
import { Star, MessageSquare, ChevronDown, ChevronUp, Quote, HelpCircle } from "lucide-react";
import { TESTIMONIALS, FAQ_ITEMS } from "../data";
import { motion, AnimatePresence } from "motion/react";

export default function Testimonials() {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="testimonials" className="py-24 bg-black border-b border-brand-muted relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-black tracking-widest uppercase">
            Testimoni Reseller
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white italic uppercase mt-4 mb-2">
            KISAH SUKSES <span className="text-brand-orange">MITRA KAMI</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light uppercase tracking-wider">
            Pengalaman nyata reseller tumbuh bersama Dapur Mak'e Zizan.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {TESTIMONIALS.map((testi, idx) => (
            <motion.div
              key={testi.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-brand-card border border-brand-border-light hover:border-brand-orange/30 hover:scale-[1.01] relative transition-all group shadow-lg"
            >
              {/* Double Quotes Icon decoration */}
              <Quote className="w-12 h-12 text-brand-orange/5 absolute top-6 right-8 group-hover:text-brand-orange/15 transition-colors" />

              {/* Star ratings */}
              <div className="flex gap-1 mb-5">
                {[...Array(testi.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-300 text-sm font-light leading-relaxed italic mb-6">
                "{testi.text}"
              </p>

              {/* Reviewer Meta */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-brand-border-light">
                <div className="w-11 h-11 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center font-bold text-brand-orange text-sm shadow-md">
                  {testi.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase italic tracking-tight">{testi.name}</h4>
                  <p className="text-[10px] text-brand-orange font-bold uppercase tracking-widest mt-0.5">{testi.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ SECTION */}
        <div id="faq" className="max-w-4xl mx-auto pt-16 border-t border-brand-border-light scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] text-brand-orange font-black uppercase tracking-widest">
              FAQ Reseller
            </span>
            <h3 className="text-3xl font-black text-white uppercase italic mt-2 mb-2">
              PERTANYAAN YANG <span className="text-brand-orange">SERING DIAJUKAN (F.A.Q)</span>
            </h3>
            <p className="text-xs text-gray-400 font-light uppercase tracking-wider">
              Miliki pemahaman lengkap mengenai skema kerja sama sebelum bergabung.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-brand-border-light bg-brand-card overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-white hover:text-brand-orange transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-brand-orange shrink-0" />
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-brand-orange shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-brand-border-light"
                      >
                        <p className="p-5 text-sm text-gray-300 font-light leading-relaxed bg-black/40">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
