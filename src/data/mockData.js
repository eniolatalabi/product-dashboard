// Import all product images
import dress1 from '../images/products/dresses/dress1.jpg';
import dress2 from '../images/products/dresses/dress2.jpg';
import dress3 from '../images/products/dresses/dress3.jpg';
import dress4 from '../images/products/dresses/dress4.jpg';
import dress5 from '../images/products/dresses/dress5.jpg';
import gown1 from '../images/products/dresses/gown1.jpg';
import gown2 from '../images/products/dresses/gown2.jpg';
import gown3 from '../images/products/dresses/gown3.jpg';

import top1 from '../images/products/tops/top1.jpg';
import top2 from '../images/products/tops/top2.jpg';
import top3 from '../images/products/tops/top3.jpg';
import top4 from '../images/products/tops/top4.jpg';
import outer1 from '../images/products/tops/outer1.jpg';
import outer2 from '../images/products/tops/outer2.jpg';
import outer3 from '../images/products/tops/outer3.jpg';
import outer4 from '../images/products/tops/outer4.jpg';

import bottom1 from '../images/products/bottoms/bottom1.jpg';
import bottom2 from '../images/products/bottoms/bottom2.jpg';
import bottom3 from '../images/products/bottoms/bottom3.jpg';
import bottom4 from '../images/products/bottoms/bottom4.jpg';
import bottom5 from '../images/products/bottoms/bottom5.jpg';
import bottom6 from '../images/products/bottoms/bottom6.jpg';
import bottom7 from '../images/products/bottoms/bottom7.jpg';
import bottom8 from '../images/products/bottoms/bottom8.jpg';
import skirt1 from '../images/products/bottoms/skirt1.jpg';
import skirt2 from '../images/products/bottoms/skirt2.jpg';
import skirt3 from '../images/products/bottoms/skirt3.jpg';
import skirt4 from '../images/products/bottoms/skirt4.jpg';

import accessories1 from '../images/products/accessories/accessories1.jpg';
import accessories2 from '../images/products/accessories/accessories2.jpg';
import accessories3 from '../images/products/accessories/accessories3.jpg';
import accessories4 from '../images/products/accessories/accessories4.jpg';
import accessories5 from '../images/products/accessories/accessories5.jpg';
import accessories6 from '../images/products/accessories/accessories6.jpg';
import accessories7 from '../images/products/accessories/accessories7.jpg';
import accessories8 from '../images/products/accessories/accessories8.jpg';
import accessories9 from '../images/products/accessories/accessories9.jpg';
import bag1 from '../images/products/accessories/bag1.jpg';
import bag2 from '../images/products/accessories/bag2.jpg';
import bag3 from '../images/products/accessories/bag3.jpg';
import bag4 from '../images/products/accessories/bag4.jpg';
import scarf1 from '../images/products/accessories/scarf1.jpg';
import scarf2 from '../images/products/accessories/scarf2.jpg';
import scarf3 from '../images/products/accessories/scarf3.jpg';
import scarf4 from '../images/products/accessories/scarf4.jpg';



const localProductImages = {
  "Dresses": [
    dress1, dress2, dress3, dress4, dress5,
    gown1, gown2, gown3
  ],
  "Tops": [
    top1, top2, top3, top4,
    outer1, outer2, outer3, outer4
  ],
  "Bottoms": [
    bottom1, bottom2, bottom3, bottom4, bottom5,
    bottom6, bottom7, bottom8, skirt1, skirt2,
    skirt3, skirt4
  ],
  "Outerwear": [
    outer1, outer2, outer3, outer4
  ],
  "Accessories": [
    accessories1, accessories2, accessories3, accessories4,
    accessories5, accessories6, accessories7, accessories8,
    accessories9, bag1, bag2, bag3, bag4,
    scarf1, scarf2, scarf3, scarf4
  ]
};

const getProductImageUrl = (category, id) => {
  const categoryImages = localProductImages[category] || [];
  
  // if (categoryImages.length === 0) {
  //   return placeholder;
  // }
  
  const imageIndex = (id - 1) % categoryImages.length;
  return categoryImages[imageIndex];
};

export const generateMockProducts = () => {
  const categories = ["Dresses", "Tops", "Bottoms", "Outerwear", "Accessories"];
  const brands = ["Nouva Africa", "StyleTerrain", "Audrey Collection", "Urban Fashion", "Elite Designs"];
  
  const products = [];
  
  for (let i = 1; i <= 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    
    let name;
    if (category === "Dresses") {
      name = `${["Audrey", "Elegance", "Royal", "Chic", "Modern"][Math.floor(Math.random() * 5)]} Dress`;
    } else if (category === "Tops") {
      name = `${["Silky", "Cotton", "Linen", "Designer", "Casual"][Math.floor(Math.random() * 5)]} ${["Blouse", "Top", "T-Shirt", "Sweater"][Math.floor(Math.random() * 4)]}`;
    } else if (category === "Bottoms") {
      name = `${["Slim", "Wide", "Fashion", "Classic", "Modern"][Math.floor(Math.random() * 5)]} ${["Pants", "Skirt", "Jeans", "Shorts"][Math.floor(Math.random() * 4)]}`;
    } else if (category === "Outerwear") {
      name = `${["Warm", "Light", "Waterproof", "Designer", "Casual"][Math.floor(Math.random() * 5)]} ${["Jacket", "Coat", "Cardigan"][Math.floor(Math.random() * 3)]}`;
    } else {
      name = `${["Elegant", "Simple", "Statement", "Bold", "Classic"][Math.floor(Math.random() * 5)]} ${["Necklace", "Earrings", "Bracelet", "Scarf", "Bag"][Math.floor(Math.random() * 5)]}`;
    }
    
    const price = Math.floor(Math.random() * 20) * 25 + 50;
    
    products.push({
      id: i,
      name,
      description: `Beautiful ${category.toLowerCase()} piece from our latest collection. Perfect for any occasion.`,
      category,
      price,
      stock: Math.floor(Math.random() * 100),
      brand,
      imageUrl: getProductImageUrl(category, i),
      rating: (Math.random() * 2 + 3).toFixed(1),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    });
  }
  
  return products;
};

const mockProducts = generateMockProducts();

export const fetchProducts = ({ page = 1, limit = 10, search = "", category = "" }) => {
  let filteredProducts = [...mockProducts];
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchLower) || 
      product.description.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower)
    );
  }
  
  if (category) {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        products: paginatedProducts,
        totalProducts: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit),
        currentPage: page,
      });
    }, 500);
  });
};

export const getCategories = () => {
  const categories = [...new Set(mockProducts.map(product => product.category))];
  return Promise.resolve(categories);
};

export const createProduct = (newProduct) => {
  if (!newProduct.imageUrl && newProduct.category) {
    newProduct.imageUrl = getProductImageUrl(newProduct.category, mockProducts.length + 1);
  }

  const product = {
    id: mockProducts.length + 1,
    ...newProduct,
    createdAt: new Date().toISOString(),
  };
  
  mockProducts.unshift(product); // Add to beginning of array
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(product);
    }, 500);
  });
};

export const updateProduct = (id, updatedProduct) => {
  const index = mockProducts.findIndex(p => p.id === id);
  if (index !== -1) {
    mockProducts[index] = { ...mockProducts[index], ...updatedProduct };
    return Promise.resolve(mockProducts[index]);
  }
  return Promise.reject(new Error("Product not found"));
};

export const deleteProduct = (id) => {
  const index = mockProducts.findIndex(p => p.id === id);
  if (index !== -1) {
    mockProducts.splice(index, 1);
    return Promise.resolve(true);
  }
  return Promise.reject(new Error("Product not found"));
};

export default {
  fetchProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  generateMockProducts
};