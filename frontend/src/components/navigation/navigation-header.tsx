
import Image from "next/image";

export default function NavigationHeader() {

  return (
    <header className="flex items-center justify-between h-20 ">
      <div className="header-logo flex items-center  border-r border-lines h-full   w-[300px] ps-6 flex-shrink-0 ">
        
          <Image
            src="/images/logo-dark.png"
            alt="logo"
            width="150"
            height="100"
            className="hidden dark:block"
          />
        
          <Image src="/images/logo.png" alt="logo" width="150" height="100" className="dark:hidden" />
        
      </div>
      
    </header>
  );
}
