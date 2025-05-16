/**
 * Format price with currency symbol
 * @param {number} price - The price to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted price
 */
export const formatPrice = (price, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(price);
  };
  
  /**
   * Delay function for simulating API calls
   * @param {number} ms - Time in milliseconds
   * @returns {Promise} Promise that resolves after specified time
   */
  export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  /**
   * Extract search params from URL
   * @returns {Object} Object containing search parameters
   */
  export const getSearchParams = () => {
    if (typeof window === 'undefined') return {};
    
    const params = new URLSearchParams(window.location.search);
    return {
      page: parseInt(params.get('page') || '1', 10),
      category: params.get('category') || '',
      search: params.get('search') || '',
    };
  };
  
  /**
   * Update URL with search params without page reload
   * @param {Object} params - Search parameters
   */
  export const updateSearchParams = (params) => {
    if (typeof window === 'undefined') return;
    
    const url = new URL(window.location.href);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });
    
    window.history.pushState({}, '', url);
  };