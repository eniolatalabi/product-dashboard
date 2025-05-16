const getProductImageUrl = (category, id) => {
  const categoryKeywords = {
    "Dresses": "women+dress+fashion+elegant",
    "Tops": "women+top+blouse+shirt",
    "Bottoms": "women+pants+jeans+skirt",
    "Outerwear": "women+jacket+coat+cardigan",
    "Accessories": "women+jewelry+bag+scarf"
  };
  
  // Using Unsplash with category-specific searches and ID-based seed
  return `https://source.unsplash.com/300x300/?${categoryKeywords[category] || 'fashion'}&sig=${id}`;
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
      name = `${["Elegant", "Simple", "Statement", "Bold", "Classic"][Math.floor(Math.random() * 5)]} ${["Necklace", "Earrings", "Bracelet", "Scarf", "Hat"][Math.floor(Math.random() * 5)]}`;
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

// Simulated API endpoints
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
  const product = {
    id: mockProducts.length + 1,
    ...newProduct,
    createdAt: new Date().toISOString(),
  };
  
  mockProducts.push(product);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(product);
    }, 500);
  });
};

export default {
  fetchProducts,
  getCategories,
  createProduct,
  generateMockProducts
};