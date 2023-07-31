
import Image from "next/image";

export default function Header() {

  return (
    <header className="flex items-center justify-between h-20 bg-white dark:bg-gray-dark">
      <div className="header-logo flex items-center  border-r border-lines h-full   w-[300px] ps-8 flex-shrink-0 dark:bg-gray-dark">
        
          <Image
            src="/images/logo-dark.png"
            alt="logo"
            width="150"
            height="100"
            className="hidden dark:block"
          />
        
          <Image src="/images/logo.png" alt="logo" width="150" height="100" className="dark:hidden" />
        
      </div>
      <nav className="flex items-center justify-between px-6 h-full w-full border-b border-lines">

      </nav>
    </header>
  );
}
