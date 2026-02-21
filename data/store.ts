export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: 'Jewelry' | 'Bags' | 'Essentials';
  description: string;
  variations?: {
    type: string;
    options: string[];
  }[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Vintage Gold Necklace',
    price: 12000,
    images: ['/products/jewelry-1.jpg', '/products/jewelry-1-alt.jpg'],
    category: 'Jewelry',
    description: 'A beautiful minimalist gold necklace with a vintage touch.',
    variations: [
      { type: 'Length', options: ['16 inch', '18 inch', '20 inch'] }
    ]
  },
  {
    id: '2',
    name: 'Peach Pastel Tote Bag',
    price: 18000,
    images: ['/products/bag-1.jpg', '/products/bag-1-inside.jpg'],
    category: 'Bags',
    description: 'Soft girl aesthetic tote bag in a lovely peach color.',
  },
  {
    id: '3',
    name: 'Silk Hair Scrunchie',
    price: 2500,
    images: ['/products/essential-1.jpg', '/products/essential-1-pack.jpg'],
    category: 'Essentials',
    description: 'Premium silk scrunchie, gentle on hair.',
    variations: [
      { type: 'Color', options: ['Peach', 'Cream', 'Dusty Rose'] }
    ]
  },
  {
    id: '4',
    name: 'Bold Hoop Earrings',
    price: 8500,
    images: ['/products/jewelry-2.jpg'],
    category: 'Jewelry',
    description: 'Chunky gold hoops for a bold statement.',
  }
];

export interface DeliveryZone {
  name: string;
  fee: number;
}

export const deliveryZones: DeliveryZone[] = [
  { name: 'Festac', fee: 2000 },
  { name: 'Mile 2', fee: 1500 },
  { name: 'Lekki', fee: 4000 },
  { name: 'Abuja', fee: 7000 },
  { name: 'Alaba', fee: 1500 },
  { name: 'Pickup', fee: 0 }
];
