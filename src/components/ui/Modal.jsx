import React, { useEffect } from 'react';
import Button from './Button';
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  useEffect(() => {
    // Disable body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="relative max-w-lg w-full mx-auto bg-white rounded-lg shadow-xl p-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-3 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <FiX className="h-6 w-6" />
        </button>
        </div>
        
        <div className="py-4">
          {children}
        </div>
        
        {footer && (
          <div className="pt-3 border-t flex justify-end space-x-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;