import catalog from "./catalog.generated.json";

export type ProductStatus = "Ready Stock" | "Pre-order" | "Custom" | "Konfirmasi Admin";

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
  institution: string;
  attributeType: string;
  shortDescription: string;
  fullDescription: string;
  material: string;
  size: string;
  color: string;
  variant: string;
  status: ProductStatus;
  minOrder: string;
  image: string;
  images: string[];
  sourceName: string;
  featured?: boolean;
};

export const categories = catalog.categories as Category[];
export const attributeTypes = catalog.attributeTypes as string[];
export const products = catalog.products as Product[];
export const featuredProducts = products.filter((product) => product.featured);

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function productWhatsappMessage(product: Product) {
  const category = getCategory(product.category)?.name ?? product.category;

  return `Assalamu'alaikum / Halo Admin BAC, saya ingin bertanya tentang produk:\n\nNama Produk: ${product.name}\nInstansi: ${category}\nJenis Atribut: ${product.attributeType}\n\nMohon informasi ketersediaan, bahan, ukuran, dan minimal order.`;
}
