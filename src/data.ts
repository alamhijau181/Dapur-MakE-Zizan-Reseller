import { MenuItem, MenuCategory } from "./types";
import bolenImg from "./assets/images/regenerated_image_1784179149983.jpg";
import pizzaImg from "./assets/images/regenerated_image_1784179152042.jpg";
import susImg from "./assets/images/regenerated_image_1784179154668.jpg";
import pizzaLongImg from "./assets/images/regenerated_image_1784179156639.jpg";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "bolen",
    name: "Bolen Pisang Mak'e Zizan",
    category: MenuCategory.Pastry,
    resellerPrice: 35000,
    description: "Pisang bolen panggang dengan kulit pastry premium yang renyah di luar dan lembut di dalam. 1 Box isi 8 pcs.",
    image: bolenImg,
    specs: ["Isi 8 pcs per box", "Kulit pastry premium", "Tanpa bahan pengawet", "Panggang fresh setiap hari"],
    optionsLabel: "Pilihan Isian (Request)",
    options: ["Pisang Coklat Keju", "Pisang Coklat", "Pisang Keju"],
    bulkDiscounts: [
      { minQty: 25, discountPercent: 20 },
      { minQty: 10, discountPercent: 15 },
      { minQty: 5, discountPercent: 10 },
    ],
  },
  {
    id: "pizza",
    name: "Pizza Reguler Mak'e Zizan",
    category: MenuCategory.Pizza,
    resellerPrice: 43000,
    description: "Pizza premium hangat ukuran loyang 20cm dengan saus spesial Mak'e Zizan, keju mozzarella mulur, dan aneka topping lezat.",
    image: pizzaImg,
    specs: ["Diameter loyang 20cm", "Topping daging & sosis melimpah", "Keju Mozzarella premium", "Saus rahasia khas Dapur Mak'e"],
    customMessageCost: 4000,
    customMessageLabel: "Tambah Ucapan Keju (+Rp 4.000)",
    bulkDiscounts: [
      { minQty: 25, discountPercent: 20 },
      { minQty: 10, discountPercent: 15 },
      { minQty: 5, discountPercent: 10 },
    ],
  },
  {
    id: "sus-buah",
    name: "Sus Buah Premium",
    category: MenuCategory.Pastry,
    resellerPrice: 35000,
    description: "Kue sus renyah dengan isian vla vanilla super lembut dan creamy, ditata cantik dengan potongan buah segar (strawberry, kiwi, jeruk). 1 Box isi 8 pcs.",
    image: susImg,
    specs: ["1 Box isi 8 pcs", "Vla vanilla homemade creamy", "Buah-buahan segar & berkualitas", "Sempurna untuk hantaran / snack box"],
    customMessageCost: 4000,
    customMessageLabel: "Tambah Ucapan (+Rp 4.000)",
    bulkDiscounts: [
      { minQty: 25, discountPercent: 20 },
      { minQty: 10, discountPercent: 15 },
      { minQty: 5, discountPercent: 10 },
    ],
  },
  {
    id: "pizza-long",
    name: "Pizza Long Extra Topping",
    category: MenuCategory.Pizza,
    resellerPrice: 120000,
    description: "Pizza berukuran jumbo 40x20cm dengan EXTRA Topping premium melimpah. Sangat cocok untuk acara keluarga, arisan, atau pesta ulang tahun.",
    image: pizzaLongImg,
    specs: ["Ukuran raksasa 40x20cm", "EXTRA Topping melimpah ruah", "Mozzarella tebal & gurih", "Porsi kenyang 6-8 orang"],
    customMessageCost: 4000,
    customMessageLabel: "Pakai Ucapan Keju (+Rp 4.000)",
    bulkDiscounts: [
      { minQty: 10, discountPercent: 15 },
      { minQty: 5, discountPercent: 10 },
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: "testi-1",
    name: "Bunda Rania",
    role: "Reseller Aktif - Surabaya",
    text: "Semenjak gabung jadi reseller Dapur Mak'e Zizan, jualan jadi makin laris manis! Bolen pisangnya juara banget, empuk, kejunya tebel. Pelanggan saya selalu repeat order. Untungnya lumayan banget dapet diskon s/d 20%!",
    rating: 5,
    avatarSeed: "rania",
  },
  {
    id: "testi-2",
    name: "Kak Dicky",
    role: "Pelanggan Setia & Reseller",
    text: "Paling suka pesen Pizza Long buat acara keluarga. Ukurannya gede banget 40x20cm dan topping-nya bener-bener EXTRA gak pelit. Tambah ucapan keju juga rapi banget bikin acara makin meriah. Worth it banget harganya!",
    rating: 5,
    avatarSeed: "dicky",
  },
  {
    id: "testi-3",
    name: "Ibu Sri Wahyuni",
    role: "Reseller Snack Box",
    text: "Sus buahnya cantik banget buat isi snack box pengajian atau arisan. Rasa vla vanillanya pas banget, gak kemanisan, dipadu buah segar bikin nagih. Harganya murah untuk kualitas premium kayak gini.",
    rating: 5,
    avatarSeed: "sri",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Bagaimana cara mendapatkan harga reseller?",
    answer: "Anda otomatis mendapatkan harga reseller yang tertera di website ini tanpa minimal pembelian untuk bergabung. Namun, diskon tambahan (10%, 15%, hingga 20%) berlaku untuk pembelian kelipatan 5, 10, atau 25 unit per macam item dalam satu kali transaksi.",
  },
  {
    question: "Apakah diskon berlaku jika saya mencampur (mix) produk?",
    answer: "Sesuai ketentuan Dapur Mak'e Zizan, diskon kuantitas hanya berlaku untuk 1 macam item (tidak berlaku mix/akumulasi produk berbeda untuk mendapatkan diskon kuantitas). Contoh: Beli 5 Bolen dapet diskon 10%, tapi beli 3 Bolen + 2 Pizza dihitung harga normal masing-masing.",
  },
  {
    question: "Bagaimana sistem pengiriman pesanan?",
    answer: "Pesanan dibuat dengan sistem Fresh-by-Order. Pengiriman dilakukan menggunakan kurir instan/sameday (GoSend/GrabExpress) atau diambil langsung ke lokasi dapur kami agar kualitas produk tetap terjaga prima saat tiba di tangan Anda.",
  },
  {
    question: "Apakah bisa request ucapan di Pizza atau Sus Buah?",
    answer: "Bisa banget! Untuk Pizza Reguler, Pizza Long, dan Sus Buah, Anda bisa menambahkan ucapan custom dari keju atau hiasan cantik hanya dengan tambahan biaya Rp 4.000 saja per item.",
  },
];

export const RESELLER_BENEFITS = [
  {
    title: "Margin Keuntungan Tinggi",
    description: "Dengan harga reseller spesial dan diskon berjenjang hingga 20%, Anda bisa mengantongi keuntungan hingga puluhan ribu rupiah per box.",
    icon: "TrendingUp",
  },
  {
    title: "Kualitas Premium Pasti Laku",
    description: "Dibuat menggunakan bahan-bahan pilihan berkualitas tinggi tanpa pengawet. Rasa lezat yang bikin konsumen repeat order terus.",
    icon: "Award",
  },
  {
    title: "Freshly Baked Every Day",
    description: "Semua pesanan dipanggang fresh di hari pengiriman untuk menjamin rasa, kelembutan, dan higienitas produk terbaik.",
    icon: "Sparkles",
  },
  {
    title: "Dukungan Promosi & Foto",
    description: "Kami menyediakan foto dan video produk resolusi tinggi siap pakai yang bisa Anda gunakan langsung untuk promosi di sosial media.",
    icon: "Image",
  },
];
