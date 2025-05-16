import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import SearchBar from './components/dashboard/SearchBar';
import CategoryFilter from './components/dashboard/CategoryFilter';
import ProductList from './components/dashboard/ProductList';
import Pagination from './components/dashboard/Pagination';
import Button from './components/ui/Button';
import CreateProductModal from './components/modals/CreateProductModal';
import { fetchProducts, getCategories, createProduct } from './data/mockData';
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
  const [totalProducts, setTotalProducts] = useState(0);

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
      const response = await fetchProducts({
        page,
        limit: 9, // 9 products per page (3x3 grid)
        category,
        search,
      });
      
      setProducts(response.products);
      setTotalPages(response.totalPages);
      setTotalProducts(response.totalProducts);
      
      // Update URL params
      updateSearchParams({
        page: page > 1 ? page : null,
        category: category || null,
        search: search || null,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
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

  // Handle create product
  const handleCreateProduct = async (productData) => {
    try {
      await createProduct(productData);
      // Refetch products to include the new one
      fetchProductsData();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col md:ml-64">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
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
              
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryFilter}
              />
            </div>
            
            {/* Product list */}
            <ProductList products={products} loading={loading} />
            
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
      
      {/* Create Product Modal */}
      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateProduct={handleCreateProduct}
        categories={categories}
      />
    </div>
  );
}

export default App;