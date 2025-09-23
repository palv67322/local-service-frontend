import React from 'react';

// Yahan ...props add karein
function Button({ children, type = 'submit', fullWidth = false, ...props }) {
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      // Aur ...props ko yahan pass karein
      {...props}
      className={`flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${widthClass}`}
    >
      {children}
    </button>
  );
}

export default Button;