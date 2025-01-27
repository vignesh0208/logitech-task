import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  const baseStyles = `rounded-lg px-4 py-2 font-medium focus:outline-none transition ease-in-out`;
  const variantStyles =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-gray-700 text-gray-300 hover:bg-gray-600';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className || ''}`}
      {...props}>
      {children}
    </button>
  );
};
