import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

const CreateProductModal = ({ isOpen, onClose, onCreateProduct, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    brand: '',
    imageUrl: 'https://picsum.photos/seed/new/300/300', // Default placeholder image
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear the error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.stock) {
      newErrors.stock = 'Stock quantity is required';
    } else if (isNaN(formData.stock) || Number(formData.stock) < 0 || !Number.isInteger(Number(formData.stock))) {
      newErrors.stock = 'Stock must be a non-negative integer';
    }
    
    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert numeric strings to numbers
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: 0, // New products start with no ratings
      };
      
      await onCreateProduct(productData);
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        brand: '',
        imageUrl: 'https://picsum.photos/seed/new/300/300',
      });
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Product"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-product-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Product'}
          </Button>
        </>
      }
    >
      <form id="create-product-form" onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className={`w-full rounded-md border ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
            value={formData.description}
            onChange={handleChange}
            required
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Price ($)"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            error={errors.price}
            required
          />
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              className={`w-full rounded-md border ${
                errors.category ? 'border-red-300' : 'border-gray-300'
              } px-3 py-2 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Stock Quantity"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={formData.stock}
            onChange={handleChange}
            error={errors.stock}
            required
          />
          
          <Input
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            error={errors.brand}
            required
          />
        </div>
        
        <Input
          label="Image URL (optional)"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Link to product image"
        />
        
        {formData.imageUrl && (
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-700 mb-1">Image Preview</p>
            <div className="w-32 h-32 rounded border border-gray-300 overflow-hidden">
              <img
                src={formData.imageUrl}
                alt="Product preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                }}
              />
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default CreateProductModal;