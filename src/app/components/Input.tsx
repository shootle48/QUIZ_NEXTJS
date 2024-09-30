// /components/Input.tsx
import { InputHTMLAttributes } from 'react';

const Input = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
  />
);

export default Input;
