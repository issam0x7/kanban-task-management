import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";



export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement,InputProps>(({className, type, ...props}, ref) => {
  return (
    <input type={type} className={twMerge("flex h-12 w-full rounded border border-input bg-transparent px-3 py-2 text-base ring-offset-border placeholder:text-muted-foreground focus-visible:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",className)} ref={ref}
    {...props}
    />
  )
});

Input.displayName = "Input";

export { Input };