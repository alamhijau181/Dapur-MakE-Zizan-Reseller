import React from "react";
import { MenuItem, OrderItem, MenuCategory } from "../types";
import { MENU_ITEMS } from "../data";
import { 
  ShoppingBag, Trash2, Plus, Percent, Send, Calculator, 
  HelpCircle, Sparkles, Check, ChevronDown, MessageSquarePlus 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ResellerCalculatorProps {
  selectedItemIdFromMenu: string | null;
  clearSelectedMenuId: () => void;
}

export default function ResellerCalculator({ 
  selectedItemIdFromMenu, 
  clearSelectedMenuId 
}: ResellerCalculatorProps) {
  // State for multiple order items
  const [orderItems, setOrderItems] = React.useState<OrderItem[]>([
    { menuItemId: "bolen", quantity: 5, selectedOption: "Pisang Coklat Keju", useCustomMessage: false, customMessage: "" }
  ]);

  // Reseller biodata
  const [resellerName, setResellerName] = React.useState("");
  const [resellerPhone, setResellerPhone] = React.useState("");
  const [shippingMethod, setShippingMethod] = React.useState("Kurir Instan (GoSend/Grab)");
  const [additionalNotes, setAdditionalNotes] = React.useState("");

  // Handle addition of item from menu section click
  React.useEffect(() => {
    if (selectedItemIdFromMenu) {
      const exists = orderItems.find(item => item.menuItemId === selectedItemIdFromMenu);
      if (exists) {
        // Just increment quantity of existing item
        setOrderItems(prev => prev.map(item => 
          item.menuItemId === selectedItemIdFromMenu 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        const menuItem = MENU_ITEMS.find(m => m.id === selectedItemIdFromMenu);
        setOrderItems(prev => [
          ...prev,
          { 
            menuItemId: selectedItemIdFromMenu, 
            quantity: 5, // Default to 5 to trigger first discount!
            selectedOption: menuItem?.options?.[0] || "",
            useCustomMessage: false,
            customMessage: ""
          }
        ]);
      }
      clearSelectedMenuId();
      
      // Smooth scroll to calculator
      const element = document.getElementById("calculator");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedItemIdFromMenu]);

  // Helper to add new row
  const addNewRow = () => {
    const unusedItem = MENU_ITEMS.find(
      m => !orderItems.some(item => item.menuItemId === m.id)
    ) || MENU_ITEMS[0];

    setOrderItems(prev => [
      ...prev,
      {
        menuItemId: unusedItem.id,
        quantity: 5, // Start with 5 to trigger initial 10% discount
        selectedOption: unusedItem.options?.[0] || "",
        useCustomMessage: false,
        customMessage: ""
      }
    ]);
  };

  // Helper to remove row
  const removeRow = (index: number) => {
    if (orderItems.length === 1) return; // keep at least 1
    setOrderItems(prev => prev.filter((_, i) => i !== index));
  };

  // Update field of specific row
  const updateRow = (index: number, fields: Partial<OrderItem>) => {
    setOrderItems(prev => prev.map((item, i) => {
      if (i !== index) return item;
      const updated = { ...item, ...fields };
      
      // If menuItemId changed, reset option and messages
      if (fields.menuItemId) {
        const newMenuItem = MENU_ITEMS.find(m => m.id === fields.menuItemId);
        updated.selectedOption = newMenuItem?.options?.[0] || "";
        updated.useCustomMessage = false;
        updated.customMessage = "";
      }
      return updated;
    }));
  };

  // Calculation details per item row
  const rowCalculations = React.useMemo(() => {
    return orderItems.map(item => {
      const menuItem = MENU_ITEMS.find(m => m.id === item.menuItemId)!;
      const baseResellerPrice = menuItem.resellerPrice;
      
      // 1. Base Cost
      const baseSubtotal = baseResellerPrice * item.quantity;
      
      // 2. Custom Message Cost (applied per quantity unit if checked)
      const customMessageSubtotal = item.useCustomMessage && menuItem.customMessageCost
        ? menuItem.customMessageCost * item.quantity
        : 0;

      // 3. Find matching discount tier
      let discountPercent = 0;
      const sortedDiscounts = [...menuItem.bulkDiscounts].sort((a, b) => b.minQty - a.minQty);
      for (const tier of sortedDiscounts) {
        if (item.quantity >= tier.minQty) {
          discountPercent = tier.discountPercent;
          break;
        }
      }

      // 4. Calculations with discount
      // Note: Discount applies to the base reseller price of the product
      const discountAmountPerItem = (baseResellerPrice * discountPercent) / 100;
      const totalDiscountAmount = discountAmountPerItem * item.quantity;
      
      const finalBaseSubtotal = baseSubtotal - totalDiscountAmount;
      const finalRowTotal = finalBaseSubtotal + customMessageSubtotal;

      return {
        menuItem,
        baseSubtotal,
        customMessageSubtotal,
        discountPercent,
        totalDiscountAmount,
        finalRowTotal,
        discountAmountPerItem,
        isDiscounted: discountPercent > 0
      };
    });
  }, [orderItems]);

  // Overall totals
  const overallTotals = React.useMemo(() => {
    let totalBaseWithoutDiscount = 0;
    let totalCustomMessageCost = 0;
    let totalSavings = 0;
    let grandTotal = 0;
    let totalQty = 0;

    rowCalculations.forEach(calc => {
      totalBaseWithoutDiscount += calc.baseSubtotal;
      totalCustomMessageCost += calc.customMessageSubtotal;
      totalSavings += calc.totalDiscountAmount;
      grandTotal += calc.finalRowTotal;
      totalQty += calc.finalRowTotal > 0 ? 1 : 0; // count distinct kinds
    });

    return {
      totalBaseWithoutDiscount,
      totalCustomMessageCost,
      totalSavings,
      grandTotal,
      totalItemsCount: orderItems.reduce((acc, curr) => acc + curr.quantity, 0)
    };
  }, [rowCalculations, orderItems]);

  // Generate WhatsApp message and redirect
  const sendWhatsAppOrder = () => {
    const formattedDate = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    let message = `*DAPUR MAK'E ZIZAN - PESANAN RESELLER*\n`;
    message += `Tanggal: ${formattedDate}\n`;
    message += `--------------------------------------------------\n\n`;
    
    message += `*BIODATA RESELLER:*\n`;
    message += `👤 Nama: ${resellerName || "-"}\n`;
    message += `📞 No. HP: ${resellerPhone || "-"}\n`;
    message += `🚚 Pengiriman: ${shippingMethod}\n`;
    if (additionalNotes) {
      message += `📝 Catatan: ${additionalNotes}\n`;
    }
    message += `\n--------------------------------------------------\n\n`;

    message += `*DETAIL PESANAN:*\n`;

    rowCalculations.forEach((calc, idx) => {
      const item = orderItems[idx];
      message += `${idx + 1}. *${calc.menuItem.name}*\n`;
      message += `   • Jumlah: ${item.quantity} unit\n`;
      
      if (item.selectedOption) {
        message += `   • Isian: ${item.selectedOption}\n`;
      }
      if (item.useCustomMessage && item.customMessage) {
        message += `   • Ucapan Custom: "${item.customMessage}" (+Rp ${(calc.customMessageSubtotal).toLocaleString("id-ID")})\n`;
      }
      
      if (calc.isDiscounted) {
        message += `   • Diskon: ${calc.discountPercent}% (Potongan Rp ${calc.totalDiscountAmount.toLocaleString("id-ID")})\n`;
      }
      
      message += `   • Subtotal: Rp ${calc.finalRowTotal.toLocaleString("id-ID")}\n\n`;
    });

    message += `--------------------------------------------------\n`;
    message += `*RINGKASAN PEMBAYARAN:*\n`;
    message += `💰 Total Harga Normal: Rp ${overallTotals.totalBaseWithoutDiscount.toLocaleString("id-ID")}\n`;
    if (overallTotals.totalCustomMessageCost > 0) {
      message += `➕ Tambahan Ucapan: Rp ${overallTotals.totalCustomMessageCost.toLocaleString("id-ID")}\n`;
    }
    message += `🔥 *Total Hemat (Potongan): Rp ${overallTotals.totalSavings.toLocaleString("id-ID")}*\n`;
    message += `✅ *GRAND TOTAL: Rp ${overallTotals.grandTotal.toLocaleString("id-ID")}*\n\n`;
    
    message += `--------------------------------------------------\n`;
    message += `_Mohon konfirmasi pesanan saya ya Dapur Mak'e Zizan. Terima kasih!_ 🙏🔥`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6287889001414?text=${encodedText}`;
    
    // Open in new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="calculator" className="py-24 bg-black relative border-b border-brand-muted overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-black tracking-widest uppercase">
            Simulasi & Transaksi
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white italic uppercase mt-4 mb-2">
            KALKULATOR ORDER <span className="text-brand-orange">RESELLER OTOMATIS</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light uppercase tracking-wider">
            Hitung akumulasi potongan harga dan total penghematan secara real-time.
          </p>
        </div>

        {/* Calculator layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Form / Builder */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl border border-brand-border-light bg-brand-card p-6 sm:p-8 shadow-2xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-brand-border-light mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white uppercase italic tracking-tight">Daftar Belanja Reseller</h3>
                    <p className="text-[11px] sm:text-xs text-gray-400 font-light">Tentukan kuantitas untuk dapat diskon maksimal</p>
                  </div>
                </div>
                <button
                  onClick={addNewRow}
                  disabled={orderItems.length >= MENU_ITEMS.length}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-brand-orange text-brand-dark text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-brand-orange-dark hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Item
                </button>
              </div>

              {/* Rows List */}
              <div className="space-y-6">
                <AnimatePresence initial={false}>
                  {orderItems.map((item, index) => {
                    const currentCalculations = rowCalculations[index];
                    if (!currentCalculations) return null;
                    const { menuItem, isDiscounted, discountPercent, totalDiscountAmount, finalRowTotal } = currentCalculations;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-5 rounded-2xl bg-black/50 border border-brand-border-light hover:border-brand-orange/30 relative group"
                      >
                        {/* Remove Button */}
                        {orderItems.length > 1 && (
                          <button
                            onClick={() => removeRow(index)}
                            className="absolute -top-2.5 -right-2.5 p-1.5 rounded-full bg-brand-card border border-brand-muted hover:border-red-500/50 text-gray-400 hover:text-red-400 shadow-md transition-all cursor-pointer"
                            title="Hapus item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                          
                          {/* Item Select */}
                          <div className="md:col-span-4">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                              Pilih Produk #{index + 1}
                            </label>
                            <div className="relative">
                              <select
                                value={item.menuItemId}
                                onChange={(e) => updateRow(index, { menuItemId: e.target.value })}
                                className="w-full pl-4 pr-10 py-3 bg-black/60 border border-brand-border-light rounded-xl text-white font-medium text-sm focus:border-brand-orange outline-none transition-all appearance-none cursor-pointer"
                              >
                                {MENU_ITEMS.map((m) => (
                                  <option key={m.id} value={m.id}>
                                    {m.name} (Rp {m.resellerPrice.toLocaleString("id-ID")})
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          {/* Options Choice (if exists) */}
                          <div className="md:col-span-3">
                            {menuItem.options ? (
                              <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                  {menuItem.optionsLabel || "Pilihan"}
                                </label>
                                <div className="relative">
                                  <select
                                    value={item.selectedOption}
                                    onChange={(e) => updateRow(index, { selectedOption: e.target.value })}
                                    className="w-full pl-4 pr-10 py-3 bg-black/60 border border-brand-border-light rounded-xl text-white font-medium text-sm focus:border-brand-orange outline-none transition-all appearance-none cursor-pointer"
                                  >
                                    {menuItem.options.map((opt, oIdx) => (
                                      <option key={oIdx} value={opt}>
                                        {opt}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                              </div>
                            ) : (
                              <div className="h-full flex items-center">
                                <span className="text-xs text-gray-500 italic">Tidak ada varian tambahan</span>
                              </div>
                            )}
                          </div>

                          {/* Quantity Counter */}
                          <div className="md:col-span-3">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                              Jumlah (Qty)
                            </label>
                            <div className="flex items-center bg-black/60 border border-brand-border-light rounded-xl p-1">
                              <button
                                type="button"
                                onClick={() => updateRow(index, { quantity: Math.max(1, item.quantity - 1) })}
                                className="w-8 h-8 rounded-lg text-gray-400 hover:bg-brand-muted hover:text-white flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="1"
                                max="100"
                                value={item.quantity}
                                onChange={(e) => updateRow(index, { quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                                className="w-full text-center bg-transparent border-none text-white font-bold text-sm outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              <button
                                type="button"
                                onClick={() => updateRow(index, { quantity: item.quantity + 1 })}
                                className="w-8 h-8 rounded-lg text-gray-400 hover:bg-brand-muted hover:text-white flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Subtotal row result */}
                          <div className="md:col-span-2 text-left md:text-right pt-3.5 md:pt-0 border-t border-brand-border-light/50 md:border-none flex justify-between md:block items-center">
                            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider md:mb-1">Subtotal</p>
                            <p className="text-lg font-black text-brand-orange md:text-white">
                              Rp {finalRowTotal.toLocaleString("id-ID")}
                            </p>
                          </div>
                        </div>

                        {/* Extra features: Custom Cheese messages for Pizza/Sus Buah */}
                        {menuItem.customMessageCost && (
                          <div className="mt-4 pt-4 border-t border-brand-muted/40 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                            <div className="md:col-span-4">
                              <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={item.useCustomMessage}
                                  onChange={(e) => updateRow(index, { useCustomMessage: e.target.checked })}
                                  className="rounded border-brand-muted text-brand-orange focus:ring-brand-orange bg-brand-card w-4.5 h-4.5 accent-brand-orange"
                                />
                                <span className="text-xs font-semibold text-gray-300">
                                  {menuItem.customMessageLabel}
                                </span>
                              </label>
                            </div>

                            <div className="md:col-span-8">
                              <AnimatePresence>
                                {item.useCustomMessage && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <input
                                      type="text"
                                      placeholder="Contoh: 'HBD Ibu 50th' atau 'Terima Kasih'"
                                      value={item.customMessage}
                                      onChange={(e) => updateRow(index, { customMessage: e.target.value })}
                                      className="w-full px-4 py-2 bg-brand-card border border-brand-muted rounded-xl text-white text-xs outline-none focus:border-brand-orange transition-all"
                                    />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        )}

                        {/* Discount notifications and alerts */}
                        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                          {isDiscounted ? (
                            <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-lg font-bold flex items-center gap-1.5">
                              <Percent className="w-3.5 h-3.5 animate-pulse" /> Diskon kuantitas {discountPercent}% aktif! (Hemat Rp {totalDiscountAmount.toLocaleString("id-ID")})
                            </span>
                          ) : (
                            <span className="text-gray-400 font-light flex items-center gap-1">
                              💡 <span className="text-brand-orange font-semibold">Beli {menuItem.bulkDiscounts[menuItem.bulkDiscounts.length - 1].minQty} unit</span> untuk mengaktifkan potongan harga pertama (10%)!
                            </span>
                          )}

                          {/* Quick target suggestion badge */}
                          {!isDiscounted && (
                            <button
                              type="button"
                              onClick={() => updateRow(index, { quantity: 5 })}
                              className="text-[10px] font-black text-brand-orange bg-brand-orange/10 px-2 py-1 rounded hover:bg-brand-orange hover:text-brand-dark transition-colors cursor-pointer"
                            >
                              Ubah ke Qty 5 (Diskon 10%)
                            </button>
                          )}
                        </div>

                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

            </div>

            {/* Reseller Form Biodata */}
            <div className="rounded-3xl border border-brand-border-light bg-brand-card p-6 sm:p-8 shadow-2xl">
              <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2 uppercase italic tracking-tight">
                👤 Biodata Reseller & Pengiriman
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Nama Reseller
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan nama lengkap Anda"
                    value={resellerName}
                    onChange={(e) => setResellerName(e.target.value)}
                    className="w-full px-4 py-3 bg-black/60 border border-brand-border-light focus:border-brand-orange rounded-xl text-white text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Nomor WhatsApp / HP
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={resellerPhone}
                    onChange={(e) => setResellerPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-black/60 border border-brand-border-light focus:border-brand-orange rounded-xl text-white text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Metode Pengiriman / Ambil
                  </label>
                  <select
                    value={shippingMethod}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="w-full px-4 py-3 bg-black/60 border border-brand-border-light focus:border-brand-orange rounded-xl text-white text-sm outline-none transition-all cursor-pointer"
                  >
                    <option value="Kurir Instan (GoSend/Grab)">Kurir Instan (GoSend/Grab)</option>
                    <option value="Kurir Sameday">Kurir Sameday</option>
                    <option value="Ambil Sendiri ke Dapur Zizan">Ambil Sendiri ke Dapur Zizan (Sidoarjo)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Catatan Tambahan (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Jam kirim, ucapan detail, dll"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="w-full px-4 py-3 bg-black/60 border border-brand-border-light focus:border-brand-orange rounded-xl text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Summary & Live Margin Visualizer */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="rounded-3xl border border-brand-border-light bg-brand-card p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Highlight Background Flare */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none"></div>

              <h3 className="text-xl font-black text-white mb-6 pb-4 border-b border-brand-border-light flex items-center gap-2 uppercase italic tracking-tight">
                <ShoppingBag className="w-5 h-5 text-brand-orange" />
                Ringkasan Order
              </h3>

              <div className="space-y-4 text-sm">
                
                {/* Total Item Count */}
                <div className="flex justify-between text-gray-400">
                  <span>Total Unit Produk:</span>
                  <span className="font-bold text-white">{overallTotals.totalItemsCount} Unit</span>
                </div>

                {/* Subtotal Normal */}
                <div className="flex justify-between text-gray-400">
                  <span>Harga Reseller Normal:</span>
                  <span className="font-medium text-white">
                    Rp {overallTotals.totalBaseWithoutDiscount.toLocaleString("id-ID")}
                  </span>
                </div>

                {/* Custom Message Fees */}
                {overallTotals.totalCustomMessageCost > 0 && (
                  <div className="flex justify-between text-gray-400">
                    <span>Tambahan Ucapan Custom:</span>
                    <span className="font-medium text-green-400">
                      +Rp {overallTotals.totalCustomMessageCost.toLocaleString("id-ID")}
                    </span>
                  </div>
                )}

                {/* Savings section (Glow) */}
                <div className="p-4 rounded-xl bg-brand-orange/10 border border-brand-orange/20 my-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[11px] text-brand-orange font-bold uppercase tracking-wider">Potongan Harga (Hemat)</p>
                      <p className="text-xs text-gray-300 font-light mt-0.5">Keuntungan berlipat reseller</p>
                    </div>
                    <span className="text-xl font-black text-brand-orange">
                      -Rp {overallTotals.totalSavings.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Final Checkout Grand Total */}
                <div className="pt-4 border-t border-brand-muted flex justify-between items-baseline mb-6">
                  <span className="text-base font-bold text-white">Total Bayar:</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-brand-orange">
                      Rp {overallTotals.grandTotal.toLocaleString("id-ID")}
                    </span>
                    <span className="block text-[10px] text-gray-400 mt-1">Belum termasuk ongkir kurir</span>
                  </div>
                </div>

                {/* Validation Warnings */}
                {(!resellerName || !resellerPhone) && (
                  <div className="p-3.5 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-yellow-400 text-xs font-light leading-relaxed mb-4">
                    ⚠️ Silakan lengkapi <strong>Nama Reseller</strong> dan <strong>Nomor WhatsApp</strong> untuk mengaktifkan tombol kirim order.
                  </div>
                )}

                {/* Order Button */}
                <button
                  onClick={sendWhatsAppOrder}
                  disabled={!resellerName || !resellerPhone}
                  className="w-full py-4 rounded-xl bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:opacity-50 text-brand-dark font-black text-base flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_6px_20px_rgba(34,197,94,0.3)] disabled:shadow-none hover:scale-[1.01] active:scale-95 transition-all"
                >
                  <Send className="w-5 h-5" />
                  Kirim Pesanan ke WhatsApp
                </button>

                <p className="text-[11px] text-gray-500 text-center mt-3 font-light leading-relaxed">
                  Pesanan akan otomatis dirangkum menjadi pesan teks rapi dan dikirim langsung ke WhatsApp resmi <strong>Dapur Mak'e Zizan</strong>.
                </p>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
