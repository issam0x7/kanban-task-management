
import Image from "next/image";
import RadioThemeMode from "./Radio";


const ThemeModeRadio = () => {
  return (
    <div className="radio__container flex justify-center items-center gap-4 h-12 min-w-[250px] px-4 bg-gray-light rounded-md">
      <Image src="/light.svg" alt="light icon" width={20} height={20} />
      <RadioThemeMode />
      <Image src="/dark.svg" alt="light icon" width={20} height={20} />
    </div>
  )
}

export default ThemeModeRadio