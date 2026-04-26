/**
 * 🎯 Datos Mock de Productos
 * 48 productos distribuidos en 4 categorías
 * Usado en FASE 1-2, migrado a Firestore en FASE 3
 */

import type { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  // ===== ELECTRONICS (12) =====
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    price: 1199.99,
    description: "Último modelo de Apple con pantalla de 6.7 pulgadas y procesador A18 Pro",
    image: "https://via.placeholder.com/300x300?text=iPhone+15",
    category: "electronics",
    rating: { rate: 4.8, count: 324 }
  },
  {
    id: 2,
    title: "Samsung Galaxy S24",
    price: 999.99,
    description: "Smartphone flagship con IA integrada y cámara de 200MP",
    image: "https://via.placeholder.com/300x300?text=Galaxy+S24",
    category: "electronics",
    rating: { rate: 4.7, count: 287 }
  },
  {
    id: 3,
    title: "MacBook Pro 14 M3",
    price: 1999.99,
    description: "Laptop profesional con chip M3 y 16GB RAM",
    image: "https://via.placeholder.com/300x300?text=MacBook+Pro",
    category: "electronics",
    rating: { rate: 4.9, count: 412 }
  },
  {
    id: 4,
    title: "iPad Air 6",
    price: 599.99,
    description: "Tablet de 11 pulgadas con chip M2 y pantalla Liquid Retina",
    image: "https://via.placeholder.com/300x300?text=iPad+Air",
    category: "electronics",
    rating: { rate: 4.6, count: 198 }
  },
  {
    id: 5,
    title: "AirPods Pro 3",
    price: 349.99,
    description: "Auriculares inalámbricos con cancelación activa de ruido",
    image: "https://via.placeholder.com/300x300?text=AirPods",
    category: "electronics",
    rating: { rate: 4.7, count: 156 }
  },
  {
    id: 6,
    title: "Sony WH-1000XM5",
    price: 399.99,
    description: "Audífonos inalámbricos premium con cancelación de ruido",
    image: "https://via.placeholder.com/300x300?text=Sony+Audio",
    category: "electronics",
    rating: { rate: 4.8, count: 243 }
  },
  {
    id: 7,
    title: "GoPro Hero 12",
    price: 499.99,
    description: "Cámara de acción 4K sumergible hasta 33m",
    image: "https://via.placeholder.com/300x300?text=GoPro",
    category: "electronics",
    rating: { rate: 4.6, count: 182 }
  },
  {
    id: 8,
    title: "DJI Mini 4 Pro",
    price: 759.99,
    description: "Dron compacto con cámara 4K y 34 minutos de vuelo",
    image: "https://via.placeholder.com/300x300?text=DJI+Drone",
    category: "electronics",
    rating: { rate: 4.7, count: 267 }
  },
  {
    id: 9,
    title: "Nintendo Switch OLED",
    price: 349.99,
    description: "Consola de juegos con pantalla OLED de 7 pulgadas",
    image: "https://via.placeholder.com/300x300?text=Nintendo",
    category: "electronics",
    rating: { rate: 4.5, count: 421 }
  },
  {
    id: 10,
    title: "Samsung 55\" OLED TV",
    price: 1499.99,
    description: "Televisor OLED 4K con tasa de refresco 120Hz",
    image: "https://via.placeholder.com/300x300?text=Samsung+TV",
    category: "electronics",
    rating: { rate: 4.8, count: 89 }
  },
  {
    id: 11,
    title: "Samsung Galaxy Watch",
    price: 299.99,
    description: "Reloj inteligente con monitor de salud y GPS",
    image: "https://via.placeholder.com/300x300?text=Galaxy+Watch",
    category: "electronics",
    rating: { rate: 4.6, count: 145 }
  },
  {
    id: 12,
    title: "Kindle Paperwhite",
    price: 179.99,
    description: "e-reader con pantalla 6.8 pulgadas e iluminación ajustable",
    image: "https://via.placeholder.com/300x300?text=Kindle",
    category: "electronics",
    rating: { rate: 4.7, count: 234 }
  },

  // ===== JEWELERY (12) =====
  {
    id: 13,
    title: "Diamond Necklace",
    price: 2499.99,
    description: "Collar de diamante auténtico en oro blanco 18k",
    image: "https://via.placeholder.com/300x300?text=Diamond+Necklace",
    category: "jewelery",
    rating: { rate: 4.9, count: 67 }
  },
  {
    id: 14,
    title: "Engagement Ring",
    price: 3999.99,
    description: "Anillo de compromiso con diamante de 1.5 quilates",
    image: "https://via.placeholder.com/300x300?text=Engagement+Ring",
    category: "jewelery",
    rating: { rate: 4.9, count: 45 }
  },
  {
    id: 15,
    title: "Pearl Bracelet",
    price: 899.99,
    description: "Pulsera de perlas de agua dulce en plata esterlina",
    image: "https://via.placeholder.com/300x300?text=Pearl+Bracelet",
    category: "jewelery",
    rating: { rate: 4.7, count: 98 }
  },
  {
    id: 16,
    title: "Sapphire Earrings",
    price: 1299.99,
    description: "Aretes de zafiro certificado con diamantes laterales",
    image: "https://via.placeholder.com/300x300?text=Sapphire+Earrings",
    category: "jewelery",
    rating: { rate: 4.8, count: 52 }
  },
  {
    id: 17,
    title: "Emerald Ring",
    price: 2199.99,
    description: "Anillo de esmeralda natural de Colombia",
    image: "https://via.placeholder.com/300x300?text=Emerald+Ring",
    category: "jewelery",
    rating: { rate: 4.8, count: 38 }
  },
  {
    id: 18,
    title: "Swiss Gold Watch",
    price: 4999.99,
    description: "Reloj de oro sólido suizo con movimiento automático",
    image: "https://via.placeholder.com/300x300?text=Gold+Watch",
    category: "jewelery",
    rating: { rate: 4.9, count: 23 }
  },
  {
    id: 19,
    title: "Gold Chain",
    price: 599.99,
    description: "Cadena de oro amarillo 14k de 18 pulgadas",
    image: "https://via.placeholder.com/300x300?text=Gold+Chain",
    category: "jewelery",
    rating: { rate: 4.6, count: 156 }
  },
  {
    id: 20,
    title: "Tennis Bracelet",
    price: 1899.99,
    description: "Pulsera de tenis con diamantes de 5 quilates",
    image: "https://via.placeholder.com/300x300?text=Tennis+Bracelet",
    category: "jewelery",
    rating: { rate: 4.8, count: 64 }
  },
  {
    id: 21,
    title: "Ruby Brooch",
    price: 1599.99,
    description: "Broche de rubí vintage con diseño art deco",
    image: "https://via.placeholder.com/300x300?text=Ruby+Brooch",
    category: "jewelery",
    rating: { rate: 4.7, count: 41 }
  },
  {
    id: 22,
    title: "Pearl Earrings",
    price: 449.99,
    description: "Aretes de perlas barrocas en plata",
    image: "https://via.placeholder.com/300x300?text=Pearl+Earrings",
    category: "jewelery",
    rating: { rate: 4.6, count: 123 }
  },
  {
    id: 23,
    title: "Crystal Tiara",
    price: 799.99,
    description: "Tiara de cristal de Swarovski para ocasiones especiales",
    image: "https://via.placeholder.com/300x300?text=Crystal+Tiara",
    category: "jewelery",
    rating: { rate: 4.7, count: 87 }
  },
  {
    id: 24,
    title: "Turquoise Ring",
    price: 699.99,
    description: "Anillo de turquesa auténtica en plata",
    image: "https://via.placeholder.com/300x300?text=Turquoise+Ring",
    category: "jewelery",
    rating: { rate: 4.6, count: 72 }
  },

  // ===== MEN'S CLOTHING (12) =====
  {
    id: 25,
    title: "Henley Shirt",
    price: 89.99,
    description: "Camiseta Henley de algodón 100% para hombre",
    image: "https://via.placeholder.com/300x300?text=Henley+Shirt",
    category: "men's clothing",
    rating: { rate: 4.5, count: 234 }
  },
  {
    id: 26,
    title: "Chino Pants",
    price: 129.99,
    description: "Pantalones chinos de algodón transpirable",
    image: "https://via.placeholder.com/300x300?text=Chino+Pants",
    category: "men's clothing",
    rating: { rate: 4.6, count: 189 }
  },
  {
    id: 27,
    title: "Navy Blazer",
    price: 249.99,
    description: "Blazer azul marino de lana y poliéster",
    image: "https://via.placeholder.com/300x300?text=Navy+Blazer",
    category: "men's clothing",
    rating: { rate: 4.7, count: 145 }
  },
  {
    id: 28,
    title: "Gray Hoodie",
    price: 79.99,
    description: "Sudadera gris de algodón con capucha",
    image: "https://via.placeholder.com/300x300?text=Gray+Hoodie",
    category: "men's clothing",
    rating: { rate: 4.5, count: 312 }
  },
  {
    id: 29,
    title: "Slim Jeans",
    price: 119.99,
    description: "Jeans azul oscuro corte slim fit",
    image: "https://via.placeholder.com/300x300?text=Slim+Jeans",
    category: "men's clothing",
    rating: { rate: 4.6, count: 267 }
  },
  {
    id: 30,
    title: "Oxford Shirt",
    price: 99.99,
    description: "Camisa Oxford blanca de algodón premium",
    image: "https://via.placeholder.com/300x300?text=Oxford+Shirt",
    category: "men's clothing",
    rating: { rate: 4.7, count: 198 }
  },
  {
    id: 31,
    title: "Black Leather Jacket",
    price: 449.99,
    description: "Chaqueta de cuero genuino negra",
    image: "https://via.placeholder.com/300x300?text=Leather+Jacket",
    category: "men's clothing",
    rating: { rate: 4.8, count: 156 }
  },
  {
    id: 32,
    title: "Khaki Shorts",
    price: 69.99,
    description: "Shorts caqui de algodón puro",
    image: "https://via.placeholder.com/300x300?text=Khaki+Shorts",
    category: "men's clothing",
    rating: { rate: 4.4, count: 223 }
  },
  {
    id: 33,
    title: "Turtleneck",
    price: 139.99,
    description: "Suéter cuello alto de lana merino",
    image: "https://via.placeholder.com/300x300?text=Turtleneck",
    category: "men's clothing",
    rating: { rate: 4.6, count: 134 }
  },
  {
    id: 34,
    title: "Gray Suit",
    price: 599.99,
    description: "Traje gris de lana italiana 100%",
    image: "https://via.placeholder.com/300x300?text=Gray+Suit",
    category: "men's clothing",
    rating: { rate: 4.8, count: 89 }
  },
  {
    id: 35,
    title: "Leather Belt",
    price: 59.99,
    description: "Cinturón de cuero genuino marrón",
    image: "https://via.placeholder.com/300x300?text=Leather+Belt",
    category: "men's clothing",
    rating: { rate: 4.5, count: 345 }
  },
  {
    id: 36,
    title: "Fleece Sweater",
    price: 89.99,
    description: "Suéter de forro polar cómodo",
    image: "https://via.placeholder.com/300x300?text=Fleece+Sweater",
    category: "men's clothing",
    rating: { rate: 4.6, count: 267 }
  },

  // ===== WOMEN'S CLOTHING (12) =====
  {
    id: 37,
    title: "Cocktail Dress",
    price: 199.99,
    description: "Vestido de cóctel elegante color negro",
    image: "https://via.placeholder.com/300x300?text=Cocktail+Dress",
    category: "women's clothing",
    rating: { rate: 4.7, count: 178 }
  },
  {
    id: 38,
    title: "Silk Blouse",
    price: 129.99,
    description: "Blusa de seda pura color blanco",
    image: "https://via.placeholder.com/300x300?text=Silk+Blouse",
    category: "women's clothing",
    rating: { rate: 4.6, count: 145 }
  },
  {
    id: 39,
    title: "Yoga Pants",
    price: 89.99,
    description: "Pantalones de yoga de lycra elástica",
    image: "https://via.placeholder.com/300x300?text=Yoga+Pants",
    category: "women's clothing",
    rating: { rate: 4.5, count: 456 }
  },
  {
    id: 40,
    title: "Denim Jacket",
    price: 129.99,
    description: "Chaqueta de denim clásica azul",
    image: "https://via.placeholder.com/300x300?text=Denim+Jacket",
    category: "women's clothing",
    rating: { rate: 4.6, count: 267 }
  },
  {
    id: 41,
    title: "Pleated Skirt",
    price: 119.99,
    description: "Falda plisada de algodón beige",
    image: "https://via.placeholder.com/300x300?text=Pleated+Skirt",
    category: "women's clothing",
    rating: { rate: 4.5, count: 189 }
  },
  {
    id: 42,
    title: "Premium Leggings",
    price: 79.99,
    description: "Leggings premium de tela transpirable",
    image: "https://via.placeholder.com/300x300?text=Leggings",
    category: "women's clothing",
    rating: { rate: 4.4, count: 334 }
  },
  {
    id: 43,
    title: "Oversized Sweater",
    price: 109.99,
    description: "Suéter oversized gris cómodo",
    image: "https://via.placeholder.com/300x300?text=Oversized+Sweater",
    category: "women's clothing",
    rating: { rate: 4.6, count: 212 }
  },
  {
    id: 44,
    title: "Cardigan",
    price: 139.99,
    description: "Cardigan de punto fino color crema",
    image: "https://via.placeholder.com/300x300?text=Cardigan",
    category: "women's clothing",
    rating: { rate: 4.7, count: 156 }
  },
  {
    id: 45,
    title: "Skinny Jeans",
    price: 99.99,
    description: "Jeans skinny azul oscuro",
    image: "https://via.placeholder.com/300x300?text=Skinny+Jeans",
    category: "women's clothing",
    rating: { rate: 4.5, count: 289 }
  },
  {
    id: 46,
    title: "Linen Dress",
    price: 149.99,
    description: "Vestido de lino blanco estilo verano",
    image: "https://via.placeholder.com/300x300?text=Linen+Dress",
    category: "women's clothing",
    rating: { rate: 4.6, count: 123 }
  },
  {
    id: 47,
    title: "Crop Top",
    price: 49.99,
    description: "Crop top de algodón con estampado",
    image: "https://via.placeholder.com/300x300?text=Crop+Top",
    category: "women's clothing",
    rating: { rate: 4.3, count: 345 }
  },
  {
    id: 48,
    title: "Long Camel Coat",
    price: 299.99,
    description: "Abrigo largo color camello de lana",
    image: "https://via.placeholder.com/300x300?text=Camel+Coat",
    category: "women's clothing",
    rating: { rate: 4.7, count: 134 }
  },
];

export default MOCK_PRODUCTS;
