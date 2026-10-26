export interface ProductSwatch {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Sneakers' | 'Hoodies' | 'Accessories' | 'T-Shirts' | 'Apparel';
  brand: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  isSale?: boolean;
  image: string;
  swatches?: ProductSwatch[];
  sizes: string[];
  description: string;
  sku: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
}

export interface EditorialItem {
  id: string;
  handle: string;
  title: string;
  outfitProductId: string;
  image: string;
  location: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  verifiedItem: string;
  rating: number;
  avatar: string;
}

export interface BrandItem {
  id: string;
  name: string;
  subtext?: string;
  style: 'swoosh-italic' | 'jump-silhouette' | 'trefoil-crown' | 'slanted-mono' | 'box-logo' | 'graffiti-tag' | 'stacked-minimal' | 'crest-badge';
}

export const CURRENCIES = {
  USD: { symbol: '$', rate: 1, flag: '🇺🇸', code: 'USD' },
  EUR: { symbol: '€', rate: 0.92, flag: '🇪🇺', code: 'EUR' },
  GBP: { symbol: '£', rate: 0.79, flag: '🇬🇧', code: 'GBP' },
  JPY: { symbol: '¥', rate: 152, flag: '🇯🇵', code: 'JPY' },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-sneakers',
    name: 'SNEAKERS',
    slug: 'Sneakers',
    image: '/images/cat-sneakers.jpg',
    itemCount: 42,
  },
  {
    id: 'cat-hoodies',
    name: 'HOODIES',
    slug: 'Hoodies',
    image: '/images/cat-hoodies.jpg',
    itemCount: 28,
  },
  {
    id: 'cat-accessories',
    name: 'ACCESSORIES',
    slug: 'Accessories',
    image: '/images/cat-accessories.jpg',
    itemCount: 19,
  },
  {
    id: 'cat-tshirts',
    name: 'T-SHIRTS',
    slug: 'T-Shirts',
    image: '/images/cat-tshirts.jpg',
    itemCount: 34,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Retro High OG Sneaker',
    subtitle: "'Shadow 2.0'",
    category: 'Sneakers',
    brand: 'JUMP',
    price: 180.0,
    isNew: true,
    image: '/images/prod-1.jpg',
    sizes: ['US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 12'],
    description:
      'Constructed with premium full-grain black leather underlays and light smoke grey nubuck overlays over a crisp white cupsole.',
    sku: 'SD-RH1-SHDW',
  },
  {
    id: 'prod-2',
    name: 'Minimal Foam Slide',
    subtitle: "'Bone'",
    category: 'Sneakers',
    brand: 'OFFGRID',
    price: 70.0,
    isNew: true,
    image: '/images/prod-2.jpg',
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    description:
      'Injected single-piece EVA foam architecture with a deep anatomical footbed and aggressive serrated traction outsole.',
    sku: 'SD-SLD-BONE',
  },
  {
    id: 'prod-3',
    name: 'World Tour Hoodie',
    subtitle: 'Black',
    category: 'Hoodies',
    brand: 'KINETIC',
    price: 110.0,
    isNew: true,
    image: '/images/prod-3.jpg',
    swatches: [
      { name: 'Rust Orange', hex: '#D95326' },
      { name: 'Pitch Black', hex: '#141414' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      '520GSM heavyweight combed cotton fleece hoodie with drop shoulders, double-lined hood, and screen-printed World Tour street typography.',
    sku: 'SD-WTH-BLK',
  },
  {
    id: 'prod-4',
    name: 'Technical 9060 Runner',
    subtitle: "'Black Castlerock'",
    category: 'Sneakers',
    brand: 'ATLAS',
    price: 150.0,
    isNew: true,
    image: '/images/prod-4.jpg',
    sizes: ['US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 11', 'US 12'],
    description:
      'Futuristic sculpted pod midsole paired with pigskin suede and breathable dark anthra mesh uppers for all-day urban movement.',
    sku: 'SD-9060-BLK',
  },
  {
    id: 'prod-5',
    name: 'Essentials Fleece Hoodie',
    subtitle: "'Sand'",
    category: 'Hoodies',
    brand: 'ESSENTIAL CO.',
    price: 90.0,
    isNew: true,
    image: '/images/prod-5.jpg',
    swatches: [
      { name: 'Warm Sand', hex: '#D8CEBE' },
      { name: 'Washed Black', hex: '#262628' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'Relaxed boxy silhouette crafted from heavyweight 480GSM brushed fleece with rubberized chest branding and rib-knit cuffs.',
    sku: 'SD-ESS-SND',
  },
  {
    id: 'prod-6',
    name: 'Classic Club Cap',
    subtitle: 'Black',
    category: 'Accessories',
    brand: 'NORTHBLOCK',
    price: 28.0,
    isNew: true,
    image: '/images/prod-6.jpg',
    sizes: ['ONE SIZE'],
    description:
      'Six-panel unstructured twill crown with pre-curved brim, tonal matte eyelets, and adjustable metal tri-glide strap.',
    sku: 'SD-CAP-BLK',
  },
  {
    id: 'prod-7',
    name: 'Never Follow Graphic Hoodie',
    subtitle: "'Washed Pitch'",
    category: 'Hoodies',
    brand: 'RAWLINE',
    price: 98.0,
    originalPrice: 145.0,
    isNew: false,
    isSale: true,
    image: '/images/cat-hoodies.jpg',
    swatches: [
      { name: 'Pitch Black', hex: '#121212' },
      { name: 'Concrete Grey', hex: '#52525B' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Oversized street fit with raw brush-script back print, distressed enzyme wash, and heavy kangaroo pocket.',
    sku: 'SD-NFH-BLK',
  },
  {
    id: 'prod-8',
    name: 'Inferno Archive Graphic Tee',
    subtitle: "'Vintage Black'",
    category: 'T-Shirts',
    brand: 'RAWLINE',
    price: 45.0,
    originalPrice: 75.0,
    isNew: false,
    isSale: true,
    image: '/images/cat-tshirts.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      '300GSM heavyweight jersey tee featuring custom multi-screen orange & bone street illustration and thick 1-inch collar rib.',
    sku: 'SD-INF-TEE',
  },
];

export const EDITORIAL_GALLERY: EditorialItem[] = [
  {
    id: 'ed-1',
    handle: '@marcus.vance',
    title: 'District Orange Heavyweight Fit',
    outfitProductId: 'prod-3',
    image: '/images/editorial-1.jpg',
    location: 'SoHo, NY',
  },
  {
    id: 'ed-2',
    handle: '@kobi.street',
    title: 'Industrial Shutter Cargo Look',
    outfitProductId: 'prod-7',
    image: '/images/editorial-2.jpg',
    location: 'Shibuya, TY',
  },
  {
    id: 'ed-3',
    handle: '@dante.kicks',
    title: 'Retro High OG On-Foot Rotation',
    outfitProductId: 'prod-1',
    image: '/images/editorial-3.jpg',
    location: 'Chicago, IL',
  },
  {
    id: 'ed-4',
    handle: '@zayn.archive',
    title: 'Night Shift Technical Layering',
    outfitProductId: 'prod-6',
    image: '/images/editorial-4.jpg',
    location: 'Shoreditch, LDN',
  },
  {
    id: 'ed-5',
    handle: '@leo.threads',
    title: 'Sand Fleece Concrete Sessions',
    outfitProductId: 'prod-5',
    image: '/images/editorial-5.jpg',
    location: 'Fairfax, LA',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-1',
    quote:
      'Fast shipping, authentic products, and fire streetwear. Street District never misses!',
    author: 'JORDAN T.',
    role: 'Verified Buyer · NYC',
    verifiedItem: 'Retro High OG Sneaker',
    rating: 5,
    avatar: '/images/avatar-1.jpg',
  },
  {
    id: 'rev-2',
    quote:
      'The quality is top-tier and the fits hit different. My new go-to store for everything street.',
    author: 'MIKE L.',
    role: 'Verified Buyer · Los Angeles',
    verifiedItem: 'World Tour Hoodie',
    rating: 5,
    avatar: '/images/avatar-2.jpg',
  },
  {
    id: 'rev-3',
    quote:
      "Love the community and the drops. Street District is more than a store, it's a vibe.",
    author: 'ALYSSA R.',
    role: 'Verified Buyer · Chicago',
    verifiedItem: 'Essentials Fleece Hoodie',
    rating: 5,
    avatar: '/images/avatar-3.jpg',
  },
];

export const BRANDS: BrandItem[] = [
  { id: 'b-1', name: 'NORTHBLOCK', style: 'swoosh-italic' },
  { id: 'b-2', name: 'JUMP', style: 'jump-silhouette' },
  { id: 'b-3', name: 'atlas', style: 'trefoil-crown' },
  { id: 'b-4', name: 'AB', subtext: 'ARCHIVE BALANCE', style: 'slanted-mono' },
  { id: 'b-5', name: 'Rawline', style: 'box-logo' },
  { id: 'b-6', name: 'Kinetic', style: 'graffiti-tag' },
  { id: 'b-7', name: 'ESSENTIAL CO.', subtext: 'LOS ANGELES', style: 'stacked-minimal' },
  { id: 'b-8', name: 'OFFGRID', style: 'crest-badge' },
];

export const STORE_LOCATIONS = [
  {
    city: 'NEW YORK — SOHO FLAGSHIP',
    address: '142 Mercer St, New York, NY 10012',
    hours: 'Mon–Sat 11AM–8PM · Sun 12PM–7PM',
    status: 'Drop Queue Active Fridays 10AM',
  },
  {
    city: 'LOS ANGELES — FAIRFAX DISTRICT',
    address: '456 N Fairfax Ave, Los Angeles, CA 90036',
    hours: 'Mon–Sat 11AM–8PM · Sun 12PM–7PM',
    status: 'In-Store Pickup Available',
  },
  {
    city: 'LONDON — SOHO VAULT',
    address: '28 Berwick St, London W1F 8RB, UK',
    hours: 'Mon–Sat 10AM–7PM · Sun 12PM–6PM',
    status: 'Authentication Lab On-Site',
  },
  {
    city: 'TOKYO — SHIBUYA CHAPTER',
    address: '1-20-9 Jinnan, Shibuya-ku, Tokyo 150-0041',
    hours: 'Daily 11AM–8PM JST',
    status: 'Archive Exhibition Open',
  },
];
