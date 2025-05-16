import React, { useState, useRef } from 'react';
import { FiUpload, FiLink, FiX, FiCheckCircle } from 'react-icons/fi';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

const CreateProductModal = ({ 
  isOpen, 
  onClose, 
  onCreateProduct, 
  categories, 
  initialData = {}, 
  title,
  successMessage = "Product created successfully",
  onNotify = () => {} // Function to trigger notification
}) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || '',
    category: initialData.category || '',
    stock: initialData.stock || '',
    brand: initialData.brand || '',
    imageUrl: initialData.imageUrl || 'https://picsum.photos/seed/new/300/300', // Default placeholder image
  });
  
  const [imageSource, setImageSource] = useState('url');
  const [previewImage, setPreviewImage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
      setImageSource('upload');
    };
    reader.readAsDataURL(file);
    setFormData({...formData, imageUrl: ''});
    
    // Clear any image errors
    if (errors.image) {
      setErrors({...errors, image: ''});
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
    
    // Validate either URL or uploaded image exists
    if (imageSource === 'url' && !formData.imageUrl.trim()) {
      newErrors.image = 'Image URL is required';
    } else if (imageSource === 'upload' && !previewImage) {
      newErrors.image = 'Image upload is required';
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
      const finalImage = imageSource === 'upload' ? previewImage : formData.imageUrl;
      
      // Convert numeric strings to numbers
      const productData = {
        ...formData,
        imageUrl: finalImage,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: initialData.rating || 0,
        id: initialData.id || Date.now()
      };
      
      await onCreateProduct(productData);
      
      // Show notification instead of alert
      onNotify({
        message: `${productData.name} ${successMessage}`,
        variant: 'success'
      });
      
      // Close modal
      onClose();
      
      // Reset form if not editing
      if (!initialData.id) {
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          stock: '',
          brand: '',
          imageUrl: 'https://picsum.photos/seed/new/300/300',
        });
        setPreviewImage('');
        setImageSource('url');
      }
    } catch (error) {
      console.error('Error creating/updating product:', error);
      onNotify({
        message: `Error: ${error.message || 'Failed to process product'}`,
        variant: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title || (initialData.id ? `Edit ${initialData.name}` : "Create New Product")}
    >
      <form id="create-product-form" onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload Section */}
        <div>
          <div className="flex gap-4 mb-2">
            <Button 
              type="button" 
              variant={imageSource === 'url' ? 'primary' : 'ghost'} 
              onClick={() => setImageSource('url')}
              icon={<FiLink />}
            >
              URL
            </Button>
            <Button 
              type="button" 
              variant={imageSource === 'upload' ? 'primary' : 'ghost'} 
              onClick={() => {
                setImageSource('upload');
                fileInputRef.current?.click();
              }}
              icon={<FiUpload />}
            >
              Upload
            </Button>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
          
          {imageSource === 'url' ? (
            <Input
              label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              error={errors.image}
            />
          ) : previewImage ? (
            <div className="mt-2">
              <img src={previewImage} alt="Preview" className="h-32 object-contain mx-auto" />
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setPreviewImage('')}
                icon={<FiX />}
                className="mt-2"
              >
                Remove
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <FiUpload className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
              {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
            </div>
          )}
        </div>

        {/* Other form fields */}
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
        
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            icon={<FiCheckCircle />}
            disabled={isSubmitting}
          >
            {isSubmitting ? (initialData.id ? 'Updating...' : 'Creating...') : (initialData.id ? 'Update' : 'Create')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateProductModal;