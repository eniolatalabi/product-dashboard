import CreateProductModal from './CreateProductModal';

const EditProductModal = ({ product, ...props }) => (
  <CreateProductModal 
    {...props}
    title={`Edit ${product.name}`}
    initialData={product}
    onSubmitMessage={`${product.name} successfully updated`}
  />
);

export default EditProductModal;