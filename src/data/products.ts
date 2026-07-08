export type ProductStatus = "Ready Stock" | "Pre-order" | "Custom";

export type Category = {
  name: string;
  slug: string;
  description: string;
  color: string;
  accent: string;
};

export type Product = {
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  material: string;
  size: string;
  color: string;
  variant: string;
  status: ProductStatus;
  minOrder: string;
  image: string;
  featured?: boolean;
};

export const categories: Category[] = [
  {
    name: "Kejaksaan RI",
    slug: "atribut-kejaksaan-ri",
    description: "Atribut bernuansa resmi untuk kebutuhan kejaksaan dan pengadaan terkait.",
    color: "#6f0f18",
    accent: "#c79a3b",
  },
  {
    name: "Polri",
    slug: "atribut-polri",
    description: "Perlengkapan atribut kepolisian dan kebutuhan seragam operasional.",
    color: "#132e5f",
    accent: "#d5a320",
  },
  {
    name: "Kemenhub",
    slug: "atribut-kemenhub",
    description: "Atribut perhubungan dengan aksen biru dan oranye yang mudah dikenali.",
    color: "#1456a0",
    accent: "#f47b20",
  },
  {
    name: "Kemenkumham",
    slug: "atribut-kemenkumham",
    description: "Atribut formal untuk kebutuhan kementerian dan unit kerja hukum.",
    color: "#173f7a",
    accent: "#c99a2e",
  },
  {
    name: "Damkar",
    slug: "atribut-damkar",
    description: "Badge, emblem, dan atribut pemadam kebakaran dengan karakter tegas.",
    color: "#b51f21",
    accent: "#f28c28",
  },
  {
    name: "Satpol PP",
    slug: "atribut-satpol-pp",
    description: "Atribut Polisi Pamong Praja untuk seragam, kantor, dan kegiatan lapangan.",
    color: "#27573f",
    accent: "#c1a060",
  },
  {
    name: "ASN / PNS / Korpri",
    slug: "atribut-asn-pns-korpri",
    description: "Atribut ASN, PNS, dan Korpri untuk kebutuhan personal maupun pengadaan.",
    color: "#1769aa",
    accent: "#f4c542",
  },
  {
    name: "Pejabat Daerah",
    slug: "atribut-pejabat-daerah",
    description: "Atribut gubernur, bupati, camat, lurah, dan kebutuhan kedinasan daerah.",
    color: "#4b1f5a",
    accent: "#d7aa45",
  },
  {
    name: "Polisi Hutan",
    slug: "atribut-polisi-hutan",
    description: "Atribut satuan kehutanan dengan karakter hijau, kuat, dan fungsional.",
    color: "#1f5b35",
    accent: "#9fbf5a",
  },
  {
    name: "Polisi Penerbangan",
    slug: "atribut-polisi-penerbangan",
    description: "Atribut penerbangan dengan aksen biru udara dan detail profesional.",
    color: "#0d72a8",
    accent: "#7cc4e8",
  },
  {
    name: "Custom Atribut",
    slug: "custom-atribut-instansi",
    description: "Badge, emblem, patch, pin, tanda pengenal, dan atribut instansi custom.",
    color: "#25324a",
    accent: "#d8a448",
  },
  {
    name: "Perlengkapan Seragam",
    slug: "perlengkapan-seragam-kedinasan",
    description: "Pendukung seragam kedinasan, display, dan kebutuhan toko/reseller.",
    color: "#31363f",
    accent: "#8bb174",
  },
];

const catalogImage = "/images/bac-catalog.webp";

export const products: Product[] = [
  {
    name: "Paket Atribut Kejaksaan RI",
    slug: "paket-atribut-kejaksaan-ri",
    category: "atribut-kejaksaan-ri",
    shortDescription: "Paket atribut untuk kebutuhan seragam dan pengadaan kejaksaan.",
    fullDescription:
      "Paket atribut bernuansa formal untuk kebutuhan instansi kejaksaan. Produk dapat disesuaikan berdasarkan referensi, kebutuhan bahan, varian ukuran, dan jumlah pesanan.",
    material: "Bordir, metal, kain drill, atau sesuai permintaan",
    size: "Menyesuaikan atribut dan referensi",
    color: "Merah marun, emas, hitam, dan varian terkait",
    variant: "Badge, pin, papan nama, patch, dan kelengkapan seragam",
    status: "Ready Stock",
    minOrder: "Satuan dan grosir",
    image: catalogImage,
    featured: true,
  },
  {
    name: "Atribut Polri Siap Order",
    slug: "atribut-polri-siap-order",
    category: "atribut-polri",
    shortDescription: "Atribut kepolisian untuk pemakaian personal, toko, dan pengadaan.",
    fullDescription:
      "Pilihan atribut Polri untuk kebutuhan seragam dan perlengkapan kedinasan. BAC dapat membantu pengecekan detail produk, stok, dan penyesuaian varian sebelum order.",
    material: "Metal, bordir komputer, kain, dan aksesoris pendukung",
    size: "Standar atribut seragam dan custom",
    color: "Navy, hitam, emas, dan varian sesuai referensi",
    variant: "Lencana, emblem, nama dada, patch, pin",
    status: "Ready Stock",
    minOrder: "Satuan, grosir, dan reseller",
    image: catalogImage,
    featured: true,
  },
  {
    name: "Atribut Kemenhub Perhubungan",
    slug: "atribut-kemenhub-perhubungan",
    category: "atribut-kemenhub",
    shortDescription: "Atribut perhubungan dengan detail rapi untuk kebutuhan instansi.",
    fullDescription:
      "Atribut Kemenhub dan perhubungan untuk seragam, kegiatan kantor, maupun kebutuhan pengadaan. Tim BAC membantu menyesuaikan bahan, warna, dan format produk sesuai referensi.",
    material: "Bordir, kain aplikasi, metal, dan lanyard",
    size: "Standar atau custom",
    color: "Biru, oranye, putih, dan navy",
    variant: "Patch, badge, pin, papan nama, lanyard",
    status: "Pre-order",
    minOrder: "Menyesuaikan jenis produk",
    image: catalogImage,
    featured: true,
  },
  {
    name: "Atribut Kemenkumham",
    slug: "atribut-kemenkumham",
    category: "atribut-kemenkumham",
    shortDescription: "Atribut formal untuk unit kerja dan kebutuhan seragam kementerian.",
    fullDescription:
      "Rangkaian atribut Kemenkumham yang dapat diproses untuk kebutuhan personal maupun instansi. Detail produk dapat dikonsultasikan melalui WhatsApp sebelum produksi atau pengiriman.",
    material: "Bordir komputer, kain, metal, dan finishing pilihan",
    size: "Sesuai referensi",
    color: "Biru, emas, putih, dan hitam",
    variant: "Badge, patch, papan nama, pin",
    status: "Custom",
    minOrder: "Mulai dari satuan tertentu",
    image: catalogImage,
  },
  {
    name: "Badge dan Patch Damkar",
    slug: "badge-dan-patch-damkar",
    category: "atribut-damkar",
    shortDescription: "Badge Damkar dengan karakter kuat untuk seragam dan kegiatan resmi.",
    fullDescription:
      "Badge dan patch Damkar dibuat dengan detail warna yang tegas, bahan yang rapi, dan opsi produksi sesuai referensi. Cocok untuk kebutuhan unit, komunitas resmi, dan pengadaan.",
    material: "Bordir komputer, kain twill, velcro opsional",
    size: "Standar seragam atau custom",
    color: "Merah, oranye, kuning, hitam",
    variant: "Patch bahu, badge dada, emblem kegiatan",
    status: "Custom",
    minOrder: "Menyesuaikan desain",
    image: catalogImage,
    featured: true,
  },
  {
    name: "Atribut Satpol PP",
    slug: "atribut-satpol-pp",
    category: "atribut-satpol-pp",
    shortDescription: "Atribut Satpol PP untuk kebutuhan seragam, kantor, dan lapangan.",
    fullDescription:
      "Atribut Satpol PP tersedia untuk kebutuhan satuan, toko, dan pemesanan khusus. Pelanggan dapat mengirim referensi desain untuk memastikan bentuk, ukuran, dan warna sesuai kebutuhan.",
    material: "Kain, bordir, metal, dan aksesoris seragam",
    size: "Standar atau custom",
    color: "Hijau, khaki, emas, dan hitam",
    variant: "Patch, pin, lencana, papan nama",
    status: "Ready Stock",
    minOrder: "Satuan dan grosir",
    image: catalogImage,
  },
  {
    name: "Atribut ASN PNS Korpri",
    slug: "atribut-asn-pns-korpri",
    category: "atribut-asn-pns-korpri",
    shortDescription: "Atribut ASN, PNS, dan Korpri untuk pemakaian resmi harian.",
    fullDescription:
      "Produk atribut ASN, PNS, dan Korpri untuk kebutuhan pribadi, kantor, sekolah kedinasan, maupun pengadaan. BAC melayani konsultasi stok, varian, dan jumlah pemesanan.",
    material: "Bordir, kain, metal, dan bahan pendukung",
    size: "Standar atribut seragam",
    color: "Biru, putih, emas, dan varian formal",
    variant: "Badge, papan nama, pin, atribut seragam",
    status: "Ready Stock",
    minOrder: "Satuan dan grosir",
    image: catalogImage,
    featured: true,
  },
  {
    name: "Atribut Pejabat Daerah",
    slug: "atribut-pejabat-daerah",
    category: "atribut-pejabat-daerah",
    shortDescription: "Atribut gubernur, bupati, camat, lurah, dan pejabat daerah.",
    fullDescription:
      "Atribut pejabat daerah untuk kebutuhan acara resmi, pelantikan, kelengkapan seragam, dan pengadaan daerah. Produk diproses berdasarkan referensi dan spesifikasi pelanggan.",
    material: "Metal, bordir, kain premium, finishing custom",
    size: "Menyesuaikan jabatan dan kebutuhan",
    color: "Marun, emas, hitam, navy",
    variant: "Pin, tanda jabatan, papan nama, emblem",
    status: "Custom",
    minOrder: "Berdasarkan jenis produk",
    image: catalogImage,
  },
  {
    name: "Atribut Polisi Hutan",
    slug: "atribut-polisi-hutan",
    category: "atribut-polisi-hutan",
    shortDescription: "Atribut satuan kehutanan dengan warna kuat dan rapi.",
    fullDescription:
      "Atribut polisi hutan untuk kebutuhan seragam lapangan, kegiatan resmi, dan pemesanan custom. BAC membantu menyesuaikan material dan finishing agar sesuai pemakaian.",
    material: "Bordir tebal, kain kuat, velcro opsional",
    size: "Standar lapangan atau custom",
    color: "Hijau, khaki, hitam, kuning",
    variant: "Patch bahu, emblem, papan nama",
    status: "Pre-order",
    minOrder: "Menyesuaikan desain",
    image: catalogImage,
  },
  {
    name: "Atribut Polisi Penerbangan",
    slug: "atribut-polisi-penerbangan",
    category: "atribut-polisi-penerbangan",
    shortDescription: "Atribut penerbangan untuk seragam, badge, dan perlengkapan resmi.",
    fullDescription:
      "Atribut polisi penerbangan dengan detail warna bersih dan profesional. Pelanggan dapat mengirim contoh referensi untuk memastikan ukuran, warna, dan format produksi.",
    material: "Bordir, kain aplikasi, metal, lanyard",
    size: "Standar atau custom",
    color: "Biru udara, navy, putih, silver",
    variant: "Patch, badge, pin, lanyard",
    status: "Custom",
    minOrder: "Menyesuaikan kebutuhan",
    image: catalogImage,
  },
  {
    name: "Custom Patch Bordir Instansi",
    slug: "custom-patch-bordir-instansi",
    category: "custom-atribut-instansi",
    shortDescription: "Patch bordir custom untuk instansi, organisasi, dan acara resmi.",
    fullDescription:
      "Layanan custom patch bordir untuk desain khusus. Pelanggan cukup mengirim referensi, ukuran, bahan, dan jumlah. Tim BAC akan membantu estimasi dan opsi produksi.",
    material: "Bordir komputer, kain twill, velcro, backing pilihan",
    size: "Bebas sesuai desain",
    color: "Mengikuti referensi",
    variant: "Patch velcro, emblem jahit, badge acara",
    status: "Custom",
    minOrder: "Menyesuaikan ukuran dan desain",
    image: catalogImage,
    featured: true,
  },
  {
    name: "Perlengkapan Seragam Kedinasan",
    slug: "perlengkapan-seragam-kedinasan",
    category: "perlengkapan-seragam-kedinasan",
    shortDescription: "Pendukung seragam untuk kebutuhan toko, reseller, dan instansi.",
    fullDescription:
      "Perlengkapan pendukung seragam kedinasan untuk pemakaian pribadi, toko, reseller, maupun pengadaan. Produk dapat dikonsultasikan berdasarkan kebutuhan stok dan varian.",
    material: "Kain, metal, plastik, lanyard, kemasan",
    size: "Beragam sesuai produk",
    color: "Menyesuaikan kategori",
    variant: "Lanyard, papan nama, pin, aksesoris seragam",
    status: "Ready Stock",
    minOrder: "Satuan dan grosir",
    image: catalogImage,
  },
];

export const featuredProducts = products.filter((product) => product.featured);

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function productWhatsappMessage(product: Product) {
  const category = getCategory(product.category)?.name ?? product.category;

  return `Assalamu'alaikum / Halo Admin BAC, saya ingin bertanya tentang produk:\n\nNama Produk: ${product.name}\nKategori: ${category}\n\nApakah produk ini tersedia?`;
}
