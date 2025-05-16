import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

// Notification variants with corresponding icons and colors
const VARIANTS = {
  success: {
    icon: FiCheckCircle,
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
    iconColor: 'text-green-500'
  },
  error: {
    icon: FiAlertCircle,
    bgColor: 'bg-red-50',
    textColor: 'text-red-800',
    borderColor: 'border-red-200',
    iconColor: 'text-red-500'
  },
  info: {
    icon: FiInfo,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-500'
  }
};

const Notification = ({ 
  message, 
  variant = 'success', 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const { icon: Icon, bgColor, textColor, borderColor, iconColor } = VARIANTS[variant] || VARIANTS.info;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 300); // Allow animation to complete before removing
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div 
      className={`fixed top-4 right-4 p-4 rounded-md shadow-md border ${borderColor} ${bgColor} ${textColor} 
        transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}
        flex items-center space-x-3 z-50 max-w-md`}
    >
      <Icon className={`h-5 w-5 ${iconColor}`} />
      <p className="flex-grow text-sm font-medium">{message}</p>
      <button 
        onClick={() => setIsVisible(false)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <FiX className="h-4 w-4" />
      </button>
    </div>
  );
};

// Notification Container to manage multiple notifications
const NotificationContainer = () => {
  const [notifications, setNotifications] = useState([]);

  // Function to add a new notification
  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { ...notification, id }]);
    return id;
  };

  // Function to remove a notification by id
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    NotificationList: () => (
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(({ id, message, variant, duration }) => (
          <Notification
            key={id}
            message={message}
            variant={variant}
            duration={duration}
            onClose={() => removeNotification(id)}
          />
        ))}
      </div>
    )
  };
};

export { NotificationContainer };