import Sidebar from "./sidebar";
export default function MainLayout({children}){
  return(
    <div className="flex min-h-screen bg-[#f8fbff]">
      <Sidebar />
      <div className="flex-1 ml-64">{children}</div>
    </div>
  )
}