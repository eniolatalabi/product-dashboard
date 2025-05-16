StyleTerrain
A modern, responsive e-commerce admin dashboard for managing fashion products, built with React and Tailwind CSS.
Show Image
🚀 Features

Product Management: Create, view, edit, and delete fashion products
Category Filtering: Filter products by categories like Dresses, Tops, Bottoms, etc.
Search Functionality: Search products by name, description, or brand
Responsive Design: Works seamlessly on desktop, tablet, and mobile devices
Interactive UI: Modern interface with loading states, transitions, and intuitive controls
Mock Data API: Simulated backend with realistic product data and images

📋 Tech Stack

React: Frontend UI library
Tailwind CSS: Utility-first CSS framework for styling
React Icons: Icon library for UI elements
Mock Data API: Simulated API for product management

🛠️ Installation
Prerequisites

Node.js (v16+)
npm or yarn

Setup Steps

Clone the repository

bashgit clone https://github.com/yourusername/fashion-ecommerce-dashboard.git
cd fashion-ecommerce-dashboard

Install dependencies

bashnpm install
# or
yarn install

Start the development server

bashnpm start
# or
yarn start

Open http://localhost:3000 in your browser to see the application

📂 Project Structure
fashion-ecommerce-dashboard/
├── public/
│   ├── images/
│   │   └── products/
│   │       ├── accessories/
│   │       ├── bottoms/
│   │       ├── dresses/
│   │       └── tops/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   └── ProductSearch.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Layout.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Modal.jsx
│   │       └── Pagination.jsx
│   ├── data/
│   │   └── mockProducts.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── ProductDetails.jsx
│   │   └── ProductsList.jsx
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   └── index.js
└── package.json
🔄 Mock API
The project uses a simulated API for product management with the following endpoints:
javascript// Fetch products with pagination, search, and filtering
fetchProducts({ page, limit, search, category })

// Get all product categories
getCategories()

// Create a new product
createProduct(productData)
💻 Usage
Product Management

View Products: Browse through the paginated product list on the main dashboard
Add Product: Click the "Add New Product" button and fill in the form
Edit Product: Click the edit icon on a product card to modify its details
Delete Product: Click the delete icon on a product card to remove it
Filter Products: Use the category filters to narrow down the product list
Search Products: Type in the search bar to find specific products

Image Management
Product images are stored in the following directory structure:
public/images/products/
├── accessories/
├── bottoms/
├── dresses/
└── tops/
The mock API automatically assigns appropriate images based on product category.
🧩 Components
ProductCard
The ProductCard component displays individual product information with:

Product image
Name and brand
Category
Rating
Price
Stock status
Edit and delete actions

jsx<ProductCard 
  product={productData}
  onDelete={handleDeleteProduct}
  onEdit={handleEditProduct}
/>
ProductGrid
Displays a responsive grid of ProductCard components with loading states:
jsx<ProductGrid 
  products={products}
  loading={loading}
  onDelete={handleDeleteProduct}
  onEdit={handleEditProduct}
/>
ProductForm
Form component for adding or editing products:
jsx<ProductForm
  initialData={productToEdit}
  onSubmit={handleSubmitProduct}
  onCancel={() => setShowForm(false)}
/>
🔧 Customization
Adding New Categories
To add new product categories:

Add the category name to the categories array in mockProducts.js
Create a corresponding folder in public/images/products/
Add product images to the new folder
Update the localProductImages object in mockProducts.js to include paths to the new images

Styling
The project uses Tailwind CSS for styling. You can customize the design by:

Modifying the Tailwind configuration in tailwind.config.js
Updating component classNames directly
Adding custom CSS in the src/styles directory

📝 License
MIT
👥 Contributing

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

🙏 Acknowledgements

React
Tailwind CSS
React Icons
Create React App