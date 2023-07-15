
import { cva } from "class-variance-authority"
import { forwardRef } from "react"


const buttonVariants = cva("",{
  variants : {

  }
})

const Button = forwardRef<HTMLButtonElement>(({}) => {
  return (
    <button>

    </button>
  )
})