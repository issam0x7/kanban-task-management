import React from "react";

interface DashboardLayoutProps {
  children? : React.ReactNode
}

export default async function DashboardLayout({children} : DashboardLayoutProps) {
  
  return (
    <div className="flex h-screen flex-col ">
      {children}
    </div>
  )
}