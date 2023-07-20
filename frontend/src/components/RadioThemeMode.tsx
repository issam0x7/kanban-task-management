"use client"
import { InputHTMLAttributes, forwardRef, useRef } from "react";



interface RadioButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  "data-mode" : string,
}


const RadioButton = forwardRef<HTMLButtonElement,  RadioButtonProps>(({"data-mode" : dataMode, onClick} : RadioButtonProps, ref) => {
  
  return (
    <button className="absolute w-4 h-4 bg-white top-[50%] -translate-y-1/2 rounded-full transition-all data-[mode=light]:-translate-x-1/3  data-[mode=dark]:translate-x-3/4 mx-1" data-mode={dataMode} onClick={onClick} ref={ref} ></button>
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