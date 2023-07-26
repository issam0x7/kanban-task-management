import Image from "next/image";



export default function Header () {

  return (
    <header className="flex items-center justify-between px-2 ">
      <div className="header-logo flex items-center w-52 border-r border-border h-20 ">
        <Image src="/images/logo.png" alt="logo" width="150" height="100" />
      </div>
    </header>
  )
}