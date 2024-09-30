// /components/Button.tsx
import { ButtonHTMLAttributes } from 'react';

const Button = ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300"
  >
    {children}
  </button>
);

export default Button;
