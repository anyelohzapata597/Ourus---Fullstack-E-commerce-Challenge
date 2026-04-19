/**
 * Mock Products Data
 * Estructura basada en FakeStore API
 * 4 categorías: electronics, jewelery, men's clothing, women's clothing
 * ~12 productos por categoría = 48 productos totales
 */

export const mockProducts = [
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
    image: "https://via.placeholder.com/300x300?text=AirPods+Pro",
    category: "electronics",
    rating: { rate: 4.7, count: 562 }
  },
  {
    id: 6,
    title: "Sony WH-1000XM5",
    price: 399.99,
    description: "Auriculares over-ear con la mejor cancelación de ruido del mercado",
    image: "https://via.placeholder.com/300x300?text=Sony+XM5",
    category: "electronics",
    rating: { rate: 4.8, count: 423 }
  },
  {
    id: 7,
    title: "GoPro Hero 12",
    price: 499.99,
    description: "Cámara de acción 4K con estabilización avanzada",
    image: "https://via.placeholder.com/300x300?text=GoPro+Hero+12",
    category: "electronics",
    rating: { rate: 4.5, count: 156 }
  },
  {
    id: 8,
    title: "DJI Mini 4 Pro",
    price: 759.99,
    description: "Dron plegable con cámara 4K y 34 minutos de vuelo",
    image: "https://via.placeholder.com/300x300?text=DJI+Mini+4",
    category: "electronics",
    rating: { rate: 4.6, count: 287 }
  },
  {
    id: 9,
    title: "Nintendo Switch OLED",
    price: 349.99,
    description: "Consola portátil con pantalla OLED de 7 pulgadas",
    image: "https://via.placeholder.com/300x300?text=Nintendo+Switch",
    category: "electronics",
    rating: { rate: 4.7, count: 623 }
  },
  {
    id: 10,
    title: "Samsung 55\" OLED TV",
    price: 1499.99,
    description: "Televisor OLED 4K con Quantum Dot",
    image: "https://via.placeholder.com/300x300?text=Samsung+OLED",
    category: "electronics",
    rating: { rate: 4.8, count: 234 }
  },
  {
    id: 11,
    title: "Smartwatch Samsung Galaxy Watch",
    price: 299.99,
    description: "Reloj inteligente con monitoreo de salud y GPS",
    image: "https://via.placeholder.com/300x300?text=Galaxy+Watch",
    category: "electronics",
    rating: { rate: 4.5, count: 342 }
  },
  {
    id: 12,
    title: "Kindle Paperwhite",
    price: 179.99,
    description: "E-reader con pantalla de 6.8 pulgadas y 10 semanas de batería",
    image: "https://via.placeholder.com/300x300?text=Kindle",
    category: "electronics",
    rating: { rate: 4.6, count: 478 }
  },

  // ===== JEWELERY (12) =====
  {
    id: 13,
    title: "Collar de Diamante Solitario",
    price: 2499.99,
    description: "Collar oro 18K con diamante certificado de 1 quilate",
    image: "https://via.placeholder.com/300x300?text=Diamond+Necklace",
    category: "jewelery",
    rating: { rate: 4.9, count: 89 }
  },
  {
    id: 14,
    title: "Anillo de Compromiso Platino",
    price: 3999.99,
    description: "Anillo con diamante redondo brillante y laterales de diamantes",
    image: "https://via.placeholder.com/300x300?text=Engagement+Ring",
    category: "jewelery",
    rating: { rate: 4.9, count: 156 }
  },
  {
    id: 15,
    title: "Pulsera de Perlas Cultivo",
    price: 899.99,
    description: "Pulsera de perlas de agua dulce con cierre de plata",
    image: "https://via.placeholder.com/300x300?text=Pearl+Bracelet",
    category: "jewelery",
    rating: { rate: 4.7, count: 112 }
  },
  {
    id: 16,
    title: "Aretes de Zafiro Azul",
    price: 1299.99,
    description: "Aretes oro blanco 14K con zafiros naturales",
    image: "https://via.placeholder.com/300x300?text=Sapphire+Earrings",
    category: "jewelery",
    rating: { rate: 4.8, count: 98 }
  },
  {
    id: 17,
    title: "Anillo Esmeralda Colombiana",
    price: 2199.99,
    description: "Anillo oro amarillo 18K con esmeralda natural de 2 quilates",
    image: "https://via.placeholder.com/300x300?text=Emerald+Ring",
    category: "jewelery",
    rating: { rate: 4.8, count: 76 }
  },
  {
    id: 18,
    title: "Reloj Suizo Oro",
    price: 4999.99,
    description: "Reloj de pulsera de lujo oro 18K con movimiento automático",
    image: "https://via.placeholder.com/300x300?text=Luxury+Watch",
    category: "jewelery",
    rating: { rate: 4.9, count: 143 }
  },
  {
    id: 19,
    title: "Collar Oro Cadena Veneziana",
    price: 599.99,
    description: "Collar de cadena veneziana en oro 14K con peso 4.5 gramos",
    image: "https://via.placeholder.com/300x300?text=Gold+Chain",
    category: "jewelery",
    rating: { rate: 4.6, count: 234 }
  },
  {
    id: 20,
    title: "Pulsera Diamante Tenis",
    price: 1899.99,
    description: "Pulsera de tenis con diamantes naturales VVS1",
    image: "https://via.placeholder.com/300x300?text=Tennis+Bracelet",
    category: "jewelery",
    rating: { rate: 4.9, count: 187 }
  },
  {
    id: 21,
    title: "Broche de Rubí",
    price: 1599.99,
    description: "Broche de plata con rubí de Birmania de 3 quilates",
    image: "https://via.placeholder.com/300x300?text=Ruby+Brooch",
    category: "jewelery",
    rating: { rate: 4.7, count: 64 }
  },
  {
    id: 22,
    title: "Aros Perla Cultivada",
    price: 449.99,
    description: "Aros de plata 925 con perlas cultivadas de Tahití",
    image: "https://via.placeholder.com/300x300?text=Pearl+Earrings",
    category: "jewelery",
    rating: { rate: 4.6, count: 128 }
  },
  {
    id: 23,
    title: "Tiara de Cristal Swarovski",
    price: 799.99,
    description: "Tiara plateada con cristales Swarovski y perlas",
    image: "https://via.placeholder.com/300x300?text=Crystal+Tiara",
    category: "jewelery",
    rating: { rate: 4.7, count: 95 }
  },
  {
    id: 24,
    title: "Anillo Diseñador Turquesa",
    price: 699.99,
    description: "Anillo artesanal en plata con turquesa natural navaja",
    image: "https://via.placeholder.com/300x300?text=Turquoise+Ring",
    category: "jewelery",
    rating: { rate: 4.5, count: 82 }
  },

  // ===== MEN'S CLOTHING (12) =====
  {
    id: 25,
    title: "Camiseta Henley Premium",
    price: 89.99,
    description: "Camiseta de algodón 100% con cuello henley y botones de madera",
    image: "https://via.placeholder.com/300x300?text=Henley+Shirt",
    category: "men's clothing",
    rating: { rate: 4.5, count: 201 }
  },
  {
    id: 26,
    title: "Pantalón Chino Beige",
    price: 129.99,
    description: "Pantalón chino ajustado en tonos neutros, ideal para casual y formal",
    image: "https://via.placeholder.com/300x300?text=Chino+Pants",
    category: "men's clothing",
    rating: { rate: 4.6, count: 287 }
  },
  {
    id: 27,
    title: "Blazer Azul Marino",
    price: 249.99,
    description: "Blazer de lana merino con forro de seda y botones de hueso",
    image: "https://via.placeholder.com/300x300?text=Blazer+Navy",
    category: "men's clothing",
    rating: { rate: 4.8, count: 156 }
  },
  {
    id: 28,
    title: "Sudadera Gris",
    price: 79.99,
    description: "Sudadera de algodón con capucha y bolsillos tipo canguro",
    image: "https://via.placeholder.com/300x300?text=Hoodie+Gray",
    category: "men's clothing",
    rating: { rate: 4.4, count: 312 }
  },
  {
    id: 29,
    title: "Jeans Azul Oscuro Slim",
    price: 119.99,
    description: "Jeans de denim premium con corte slim y desgastes sutiles",
    image: "https://via.placeholder.com/300x300?text=Slim+Jeans",
    category: "men's clothing",
    rating: { rate: 4.5, count: 423 }
  },
  {
    id: 30,
    title: "Camisa Oxford Blanca",
    price: 99.99,
    description: "Camisa Oxford en algodón 100% con botones de nácar",
    image: "https://via.placeholder.com/300x300?text=Oxford+Shirt",
    category: "men's clothing",
    rating: { rate: 4.7, count: 178 }
  },
  {
    id: 31,
    title: "Chaqueta Cuero Negro",
    price: 449.99,
    description: "Chaqueta de cuero genuino con forro de seda y cremalleras YKK",
    image: "https://via.placeholder.com/300x300?text=Leather+Jacket",
    category: "men's clothing",
    rating: { rate: 4.8, count: 234 }
  },
  {
    id: 32,
    title: "Shorts Khaki",
    price: 69.99,
    description: "Shorts cargo con múltiples bolsillos y ajuste cómodo",
    image: "https://via.placeholder.com/300x300?text=Khaki+Shorts",
    category: "men's clothing",
    rating: { rate: 4.3, count: 145 }
  },
  {
    id: 33,
    title: "Suéter Cuello Alto",
    price: 139.99,
    description: "Suéter de lana merino con cuello alto y ajuste semifit",
    image: "https://via.placeholder.com/300x300?text=Turtleneck",
    category: "men's clothing",
    rating: { rate: 4.6, count: 189 }
  },
  {
    id: 34,
    title: "Traje Formal Gris",
    price: 599.99,
    description: "Traje de lana gris claro con corte europeo clásico",
    image: "https://via.placeholder.com/300x300?text=Formal+Suit",
    category: "men's clothing",
    rating: { rate: 4.8, count: 267 }
  },
  {
    id: 35,
    title: "Cinturón de Cuero Marron",
    price: 59.99,
    description: "Cinturón de cuero genuino con hebilla cromada",
    image: "https://via.placeholder.com/300x300?text=Leather+Belt",
    category: "men's clothing",
    rating: { rate: 4.5, count: 312 }
  },
  {
    id: 36,
    title: "Sudadera Polar",
    price: 89.99,
    description: "Sudadera de polar suave con detalles de contraste",
    image: "https://via.placeholder.com/300x300?text=Fleece+Sweater",
    category: "men's clothing",
    rating: { rate: 4.4, count: 198 }
  },

  // ===== WOMEN'S CLOTHING (12) =====
  {
    id: 37,
    title: "Vestido de Cóctel Negro",
    price: 199.99,
    description: "Vestido elegante de cóctel con espalda abierta y tela brillante",
    image: "https://via.placeholder.com/300x300?text=Cocktail+Dress",
    category: "women's clothing",
    rating: { rate: 4.7, count: 234 }
  },
  {
    id: 38,
    title: "Blusa Seda Crema",
    price: 129.99,
    description: "Blusa de seda 100% con botones de perla y puños ajustables",
    image: "https://via.placeholder.com/300x300?text=Silk+Blouse",
    category: "women's clothing",
    rating: { rate: 4.6, count: 178 }
  },
  {
    id: 39,
    title: "Pantalón Yoga Gris",
    price: 89.99,
    description: "Pantalón de yoga de alta cintura con bolsillos laterales",
    image: "https://via.placeholder.com/300x300?text=Yoga+Pants",
    category: "women's clothing",
    rating: { rate: 4.5, count: 421 }
  },
  {
    id: 40,
    title: "Chaqueta Vaquera",
    price: 129.99,
    description: "Chaqueta vaquera clásica azul con borlas y remaches",
    image: "https://via.placeholder.com/300x300?text=Denim+Jacket",
    category: "women's clothing",
    rating: { rate: 4.6, count: 289 }
  },
  {
    id: 41,
    title: "Falda Plisada Midi",
    price: 119.99,
    description: "Falda plisada midi en algodón con cintura elástica",
    image: "https://via.placeholder.com/300x300?text=Pleated+Skirt",
    category: "women's clothing",
    rating: { rate: 4.5, count: 156 }
  },
  {
    id: 42,
    title: "Leggings Negro Premium",
    price: 79.99,
    description: "Leggings de alta compresión con tela mate y bolsillos",
    image: "https://via.placeholder.com/300x300?text=Premium+Leggings",
    category: "women's clothing",
    rating: { rate: 4.7, count: 534 }
  },
  {
    id: 43,
    title: "Suéter Oversized Beige",
    price: 109.99,
    description: "Suéter oversized cómodo perfecto para look casual",
    image: "https://via.placeholder.com/300x300?text=Oversized+Sweater",
    category: "women's clothing",
    rating: { rate: 4.5, count: 267 }
  },
  {
    id: 44,
    title: "Cardigan Punto Fino",
    price: 139.99,
    description: "Cardigan de punto fino con botones de madre perla",
    image: "https://via.placeholder.com/300x300?text=Cardigan+Fine",
    category: "women's clothing",
    rating: { rate: 4.6, count: 198 }
  },
  {
    id: 45,
    title: "Jeans Skinny Azul",
    price: 99.99,
    description: "Jeans skinny de cintura alta con desgastes románticos",
    image: "https://via.placeholder.com/300x300?text=Skinny+Jeans",
    category: "women's clothing",
    rating: { rate: 4.4, count: 345 }
  },
  {
    id: 46,
    title: "Vestido Casual Lino",
    price: 149.99,
    description: "Vestido casual de lino 100% con lazada en la cintura",
    image: "https://via.placeholder.com/300x300?text=Linen+Dress",
    category: "women's clothing",
    rating: { rate: 4.6, count: 212 }
  },
  {
    id: 47,
    title: "Top Crop Tejido",
    price: 49.99,
    description: "Top crop de tejido acanalado con espalda abierta",
    image: "https://via.placeholder.com/300x300?text=Crop+Top",
    category: "women's clothing",
    rating: { rate: 4.3, count: 289 }
  },
  {
    id: 48,
    title: "Abrigo Largo Camel",
    price: 299.99,
    description: "Abrigo largo de lana pura color camel con cintura ajustable",
    image: "https://via.placeholder.com/300x300?text=Long+Coat",
    category: "women's clothing",
    rating: { rate: 4.8, count: 176 }
  }
];

export default mockProducts;
