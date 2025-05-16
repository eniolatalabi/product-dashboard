import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import SearchBar from './components/dashboard/SearchBar';
import CategoryFilter from './components/dashboard/CategoryFilter';
import ProductList from './components/dashboard/ProductList';
import Pagination from './components/dashboard/Pagination';
import Button from './components/ui/Button';
import CreateProductModal from './components/modals/CreateProductModal';
import EditProductModal from './components/modals/EditProductModal';
import { NotificationContainer } from './components/ui/Notification';
import { fetchProducts, getCategories, createProduct, generateMockProducts } from './data/mockData';
import { updateSearchParams, getSearchParams } from './utils/helpers';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  
  // Initialize notification system
  const { addNotification, NotificationList } = NotificationContainer();

  // Initialize from sessionStorage
  const loadProducts = () => {
    const saved = sessionStorage.getItem('products');
    return saved ? JSON.parse(saved) : generateMockProducts();
  };

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Get URL params if any
        const { page, category, search } = getSearchParams();
        setCurrentPage(page);
        setSelectedCategory(category);
        setSearchQuery(search);
        
        // Fetch categories
        const categoriesList = await getCategories();
        setCategories(categoriesList);
        
        // Fetch products with filters from URL
        await fetchProductsData(page, category, search);
      } catch (error) {
        console.error('Error loading initial data:', error);
        addNotification({
          message: 'Failed to load initial data',
          variant: 'error'
        });
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch products with current filters
  const fetchProductsData = async (page = currentPage, category = selectedCategory, search = searchQuery) => {
    setLoading(true);
    try {
      // Use sessionStorage to get products if available
      const storedProducts = loadProducts();
      let filteredProducts = storedProducts;
      
      // Apply filters
      if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
      }
      
      if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(searchLower) || 
          p.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Calculate pagination
      const totalFilteredProducts = filteredProducts.length;
      const limit = 9; // 9 products per page (3x3 grid)
      const totalPagesCount = Math.ceil(totalFilteredProducts / limit);
      const startIndex = (page - 1) * limit;
      const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);
      
      setProducts(paginatedProducts);
      setTotalPages(totalPagesCount);
      setTotalProducts(totalFilteredProducts);
      
      // Update URL params
      updateSearchParams({
        page: page > 1 ? page : null,
        category: category || null,
        search: search || null,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      addNotification({
        message: 'Failed to fetch products',
        variant: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProductsData(page);
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page
    fetchProductsData(1, category);
  };

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page
    fetchProductsData(1, selectedCategory, searchQuery);
  };

  // Delete handler
  const handleDelete = (id) => {
    const allProducts = loadProducts();
    const productToDelete = allProducts.find(p => p.id === id);
    const updated = allProducts.filter(p => p.id !== id);
    sessionStorage.setItem('products', JSON.stringify(updated));
    fetchProductsData(currentPage, selectedCategory, searchQuery);
    
    // Show notification
    addNotification({
      message: `Product ${productToDelete?.name || `ID: ${id}`} deleted successfully`,
      variant: 'success'
    });
  };    

  // Create handler
  const handleCreate = (product) => {
    const allProducts = loadProducts();
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updated = [...allProducts, newProduct];
    sessionStorage.setItem('products', JSON.stringify(updated));
    fetchProductsData(currentPage, selectedCategory, searchQuery);
  };

  // Update handler
  const handleUpdate = (updatedProduct) => {
    const allProducts = loadProducts();
    const updated = allProducts.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    sessionStorage.setItem('products', JSON.stringify(updated));
    fetchProductsData(currentPage, selectedCategory, searchQuery);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-64">
        <Header />
        <main className="bg-white flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <div className="mt-3 sm:mt-0 sm:ml-4">
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  Add Product
                </Button>
              </div>
            </div>
            {/* Filters and Search */}
            <div className="mt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <SearchBar
                    search={searchQuery}
                    setSearch={setSearchQuery}
                    onSearch={handleSearch}
                  />
                </div>
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{products.length}</span> of{' '}
                  <span className="font-medium">{totalProducts}</span> products
                </div>
              </div>
              <div className='mt-4'>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryFilter}
              />
              </div>
            </div>
            {/* Product list */}
            <ProductList 
              products={products} 
              loading={loading} 
              onDelete={handleDelete}
              onEdit={(product) => {
                setProductToEdit(product);
                setIsEditModalOpen(true);
              }}
            />
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </main>
      </div>
      
      {/* Active notifications */}
      <NotificationList />
      
      {/* Create Product Modal */}
      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateProduct={handleCreate}
        categories={categories}
        onNotify={addNotification}
      />
      
      {/* Edit Product Modal */}
      {productToEdit && (
        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdateProduct={handleUpdate}
          product={productToEdit}
          categories={categories}
          onNotify={addNotification}
        />
      )}
    </div>
  );
}

export default App;