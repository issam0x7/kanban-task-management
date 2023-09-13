
import { VariantProps, cva } from "class-variance-authority"
import { ButtonHTMLAttributes, forwardRef } from "react"
import { twMerge } from "tailwind-merge"


const buttonVariants = cva("inline-flex items-center justify rounded-3xl text-sm font-bold transition-colors focus-visible:outline-none disabled:pointer-events-none",{
  variants : {
    variant: {
      default : "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
      destructive : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
    },

    size: {
      default : "h-10 py-2 px-4",
      lg: "h-12 py-2 px-4"
    },
  },
  defaultVariants : {
    variant : "default",
    size : "default",
  }
})



export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({className, variant, size, children, ...props}, ref) => {
  return (
    <button className={twMerge(buttonVariants({variant, size, className}))}
    ref={ref}
    {...props}>
      {children}
    </button>
  )
})


export default Button;