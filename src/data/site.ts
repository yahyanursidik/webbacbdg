export const whatsappAdmins = [
  {
    id: "bandung",
    city: "Bandung",
    name: "Marwan",
    number: "62895404673700",
    display: "+62 895-4046-73700",
  },
  {
    id: "jakarta",
    city: "Jakarta",
    name: "Melania",
    number: "6287740070047",
    display: "0877-4007-0047",
  },
] as const;

export type WhatsappAdminId = (typeof whatsappAdmins)[number]["id"];

export const site = {
  name: "CV. Berkah Abadi Creative",
  shortName: "BAC",
  tagline: "Supplier Atribut Kedinasan & Kementerian",
  description:
    "CV. Berkah Abadi Creative menyediakan atribut kedinasan dan perlengkapan instansi untuk Kejaksaan RI, Polri, Kemenhub, Kemenkumham, Damkar, Satpol PP, ASN, PNS, Korpri, pejabat daerah, dan custom order.",
  whatsappNumber: whatsappAdmins[0].number,
  whatsappDisplay: whatsappAdmins[0].display,
  chiefMarketingWhatsappNumber: whatsappAdmins[0].number,
  chiefMarketingWhatsappDisplay: whatsappAdmins[0].display,
  email: "bac.atribut@gmail.com",
  instagram: "https://instagram.com/",
  address:
    "Jati Tangatangan No.22, Bongas, Kec. Cililin, Kabupaten Bandung Barat, Jawa Barat 40562",
  jakartaStoreAddress:
    "Gedung Senen Jaya Blok 1 & 2, Lantai 2, No. D8 12-D8 12A, Pasar Senen, Jakarta Pusat",
  mapsUrl: "https://maps.app.goo.gl/yP5jM35izjMY5qKQA",
  mapsEmbed:
    "https://www.google.com/maps?q=Jati%20Tangatangan%20No.22%2C%20Bongas%2C%20Kec.%20Cililin%2C%20Kabupaten%20Bandung%20Barat%2C%20Jawa%20Barat%2040562&output=embed",
  hours: "Senin - Sabtu, 08.00 - 17.00 WIB",
};

export function whatsappUrl(message: string) {
  const params = new URLSearchParams({
    pilihAdmin: "1",
    pesan: message,
  });
  return `/kontak/?${params.toString()}#pilih-admin`;
}

export function whatsappAdminUrl(adminId: WhatsappAdminId, message: string) {
  const admin = whatsappAdmins.find((item) => item.id === adminId) ?? whatsappAdmins[0];
  return `https://wa.me/${admin.number}?text=${encodeURIComponent(message)}`;
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
