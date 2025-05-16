// src/data/mockProducts.js
const localProductImages = {
  "Dresses": [
    "/images/products/dresses/dress1.jpg",
    "/images/products/dresses/dress2.jpg",
    "/images/products/dresses/dress3.jpg",
    "/images/products/dresses/dress4.jpg",
    "/images/products/dresses/dress5.jpg",
    "/images/products/dresses/gown1.jpg",
    "/images/products/dresses/gown2.jpg",
    "/images/products/dresses/gown3.jpg",
  ],
  "Tops": [
    "/images/products/tops/top1.jpg",
    "/images/products/tops/top2.jpg",
    "/images/products/tops/top3.jpg",
    "/images/products/tops/top4.jpg",
    "/images/products/tops/outer1.jpg",
    "/images/products/tops/outer2.jpg",
    "/images/products/tops/outer3.jpg",
    "/images/products/tops/outer4.jpg",
  ],
  "Bottoms": [
    "/images/products/bottoms/bottom1.jpg",
    "/images/products/bottoms/bottom2.jpg",
    "/images/products/bottoms/bottom3.jpg",
    "/images/products/bottoms/bottom4.jpg",
    "/images/products/bottoms/bottom5.jpg",
    "/images/products/bottoms/bottom6.jpg",
    "/images/products/bottoms/bottom7.jpg",
    "/images/products/bottoms/bottom8.jpg",
    "/images/products/bottoms/skirt1.jpg",
    "/images/products/bottoms/skirt2.jpg",
    "/images/products/bottoms/skirt3.jpg",
    "/images/products/bottoms/skirt4.jpg",
  ],
  "Outerwear": [
    "/images/products/tops/outer1.jpg",
    "/images/products/tops/outer2.jpg",
    "/images/products/tops/outer3.jpg",
    "/images/products/tops/outer4.jpg",
  ],
  "Accessories": [
    "/images/products/accessories/accessories1.jpg",
    "/images/products/accessories/accessories2.jpg",
    "/images/products/accessories/accessories3.jpg",
    "/images/products/accessories/accessories4.jpg",
    "/images/products/accessories/accessories5.jpg",
    "/images/products/accessories/accessories6.jpg",
    "/images/products/accessories/accessories7.jpg",
    "/images/products/accessories/accessories8.jpg",
    "/images/products/accessories/accessories9.jpg",
    "/images/products/accessories/bag1.jpg",
    "/images/products/accessories/bag2.jpg",
    "/images/products/accessories/bag3.jpg",
    "/images/products/accessories/bag4.jpg",
    "/images/products/accessories/scarf1.jpg",
    "/images/products/accessories/scarf2.jpg",
    "/images/products/accessories/scarf3.jpg",
    "/images/products/accessories/scarf4.jpg",
  ],
};

const getProductImageUrl = (category, id) => {
  const categoryImages = localProductImages[category] || [];
  
  if (categoryImages.length === 0) {
    return "/images/placeholder.jpg";
  }
  
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