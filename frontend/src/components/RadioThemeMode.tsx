"use client"
import { InputHTMLAttributes, forwardRef, useRef } from "react";



interface RadioButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  "data-mode" : string,
}


const RadioButton = forwardRef<HTMLButtonElement,  RadioButtonProps>(({"data-mode" : dataMode, onClick} : RadioButtonProps, ref) => {
  
  return (
    <button className="radio group absolute w-full inset-0 radio flex-shrink-0" data-mode={dataMode} onClick={onClick} ref={ref} >
      <span className="absolute w-4 h-4 bg-white top-[50%] -translate-y-1/2 rounded-full transition-all left-0  mx-1 group-data-[mode=dark]:translate-x-4"></span>
    </button>
  )
})


const RadioThemeMode = () => {

  const radioRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    let currentMode =  radioRef.current?.dataset.mode;

    radioRef.current?.setAttribute('data-mode', currentMode == "light" ? "dark" : "light");

  }

  return (
    <div className="radio relative bg-primary py-2 px-1 w-10 h-5 rounded-full :">
      <RadioButton data-mode="light"  onClick={handleClick} ref={radioRef}  />
    </div>
  )
}

export default RadioThemeMode;