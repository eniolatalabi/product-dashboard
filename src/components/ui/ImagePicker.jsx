import React, { useState } from 'react';
import { FiCamera, FiX } from 'react-icons/fi';

const ImagePicker = ({ categories, selectedCategory, onImageSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localImages, setLocalImages] = useState([]);

  // Mapping of local image paths for each category
  const categoryImagesMap = {
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

  // When category changes, update the images
  React.useEffect(() => {
    if (selectedCategory) {
      setLocalImages(categoryImagesMap[selectedCategory] || []);
    } else {
      setLocalImages([]);
    }
  }, [selectedCategory]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleImageSelect = (imagePath) => {
    onImageSelect(imagePath);
    closeModal();
  };

  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <FiCamera className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
        Select Image
      </button>

      {isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Select Image for {selectedCategory || 'Product'}
                  </h3>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>
                
                {localImages.length > 0 ? (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {localImages.map((path, index) => (
                      <div 
                        key={index} 
                        className="cursor-pointer border border-gray-200 rounded-md overflow-hidden hover:border-indigo-500"
                        onClick={() => handleImageSelect(path)}
                      >
                        <img 
                          src={path} 
                          alt={`Product ${index + 1}`} 
                          className="h-24 w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-gray-500">
                    {selectedCategory 
                      ? `No images available for ${selectedCategory}` 
                      : 'Please select a category first to see available images'}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePicker;