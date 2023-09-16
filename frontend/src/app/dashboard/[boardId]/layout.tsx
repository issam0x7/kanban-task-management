import React from "react";




export default async function BoardLayout({
  children,
}: { children : React.ReactNode}) {

  return (
  
   
    <div className="h-screen flex flex-col w-full">
     
      {children}
    </div>
    
  );
}






