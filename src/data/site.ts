export const site = {
  name: "CV. Berkah Abadi Creative",
  shortName: "BAC",
  tagline: "Supplier Atribut Kedinasan & Kementerian",
  description:
    "CV. Berkah Abadi Creative menyediakan atribut kedinasan dan perlengkapan instansi untuk Kejaksaan RI, Polri, Kemenhub, Kemenkumham, Damkar, Satpol PP, ASN, PNS, Korpri, pejabat daerah, dan custom order.",
  whatsappNumber: "6287825442104",
  whatsappDisplay: "+62 878-2544-2104",
  chiefMarketingWhatsappNumber: "62895404673700",
  chiefMarketingWhatsappDisplay: "+62 895-4046-73700",
  email: "bac.atribut@gmail.com",
  instagram: "https://instagram.com/",
  address:
    "Jati Tangatangan No.22, Bongas, Kec. Cililin, Kabupaten Bandung Barat, Jawa Barat 40562",
  mapsUrl: "https://maps.app.goo.gl/yP5jM35izjMY5qKQA",
  mapsEmbed:
    "https://www.google.com/maps?q=Jati%20Tangatangan%20No.22%2C%20Bongas%2C%20Kec.%20Cililin%2C%20Kabupaten%20Bandung%20Barat%2C%20Jawa%20Barat%2040562&output=embed",
  hours: "Senin - Sabtu, 08.00 - 17.00 WIB",
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function chiefMarketingWhatsappUrl(message: string) {
  return `https://wa.me/${site.chiefMarketingWhatsappNumber}?text=${encodeURIComponent(message)}`;
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
