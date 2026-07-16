import React from "react";
import { Phone, Clock, MapPin, Instagram, Facebook, Heart } from "lucide-react";
import { DapurMakeZizanLogo } from "./DapurMakeZizanLogo";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-brand-border-light">
      
      {/* Top Footer Widgets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <DapurMakeZizanLogo size={42} />
              <h3 className="text-xl font-black text-white uppercase italic tracking-tight">
                DAPUR <span className="text-brand-orange">MAK'E ZIZAN</span>
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mb-6">
              Penyedia kue bolen pisang, pizza premium, sus buah, dan kue hantaran berkualitas tinggi di Sidoarjo. Kami membuka peluang usaha seluas-luasnya bagi Anda untuk sukses bersama melalui program reseller tepercaya kami.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl bg-brand-muted hover:bg-brand-orange hover:text-brand-dark text-gray-300 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl bg-brand-muted hover:bg-brand-orange hover:text-brand-dark text-gray-300 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Working Hours */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Jam Operasional</h4>
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4.5 h-4.5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Senin - Sabtu</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">08:00 WIB - 17:00 WIB</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4.5 h-4.5 text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-300">Minggu / Libur Nasional</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Hanya melayani pesanan khusus (Booking)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Contact & Kitchen Location */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Kontak & Dapur Kami</h4>
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Dapur Mak'e Zizan</p>
                  <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                    Perumahan Puri Indah, Blok D2 No. 12, Sidoarjo, Jawa Timur, Indonesia.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4.5 h-4.5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">WhatsApp Hotline</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">+62 878-8900-1414</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copy bar */}
      <div className="border-t border-brand-border-light bg-black py-6 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Dapur Mak'e Zizan. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="flex items-center gap-1">
            Dibuat penuh cita rasa <Heart className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" /> untuk Reseller Hebat Indonesia.
          </p>
        </div>
      </div>

    </footer>
  );
}
