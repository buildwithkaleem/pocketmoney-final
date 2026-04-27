import AdminSidebar from "@/components/dashboard/AdminSidebar";
import { Toaster } from "react-hot-toast";


export default function layout({ children }) {

  return ( 
      <div className="flex" >
        <AdminSidebar />
        <main>
        {children}
        </main>
      </div>
  );
}
