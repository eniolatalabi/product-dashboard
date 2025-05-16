import React from 'react';
import CreateProductModal from './CreateProductModal';

const EditProductModal = ({ product, isOpen, onClose, onUpdateProduct, categories, onNotify }) => (
  <CreateProductModal
    isOpen={isOpen}
    onClose={onClose}
    onCreateProduct={onUpdateProduct}
    categories={categories}
    initialData={product}
    title={`Edit ${product.name}`}
    successMessage="successfully updated"
    onNotify={onNotify}
  />
);

export default EditProductModal;