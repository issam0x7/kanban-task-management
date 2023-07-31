import ThemeSwitcher from "@/components/ThemeSwitcher"




const SideBar = ( ) => {


  return (
    <nav className="flex flex-col justify-between h-full">
      <div className="boards">

      </div>
      <div className="control">
        <ThemeSwitcher />
      </div>
    </nav>
  )
}

export default SideBar;