export const site = {
  name: "CV. Berkah Abadi Creative",
  shortName: "BAC",
  tagline: "Supplier Atribut Kedinasan & Kementerian",
  description:
    "CV. Berkah Abadi Creative menyediakan atribut kedinasan dan perlengkapan instansi untuk Kejaksaan RI, Polri, Kemenhub, Kemenkumham, Damkar, Satpol PP, ASN, PNS, Korpri, pejabat daerah, dan custom order.",
  whatsappNumber: "6281234567890",
  email: "admin@berkahabadicreative.id",
  instagram: "https://instagram.com/",
  address:
    "Alamat toko BAC, isi dengan alamat lengkap: nama jalan, kelurahan, kecamatan, kota, provinsi.",
  mapsUrl: "https://maps.google.com/?q=CV%20Berkah%20Abadi%20Creative",
  mapsEmbed:
    "https://www.google.com/maps?q=CV%20Berkah%20Abadi%20Creative&output=embed",
  hours: "Senin - Sabtu, 08.00 - 17.00 WIB",
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Tentang BAC", href: "/tentang-bac/" },
  { label: "Katalog Produk", href: "/katalog/" },
  { label: "Proses Produksi", href: "/proses-produksi/" },
  { label: "Custom Order", href: "/custom-order/" },
  { label: "Galeri", href: "/galeri/" },
  { label: "Kontak", href: "/kontak/" },
];
