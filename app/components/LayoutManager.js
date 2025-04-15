"use client";

import NavBar from "./Nav/NavBar";
import SideBar from "./Nav/SideBar";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "../context/SidebarProvider";
import { FetchProductProvider } from "../context/FetchProductProvider";
import { FetchBlogProvider } from "../context/FetchBlogProvider";

export default function LayoutManager({ children }) {
  const pathname = usePathname();
  const hideNavAndFooter = ["/adminLoginSignup", "/dashboard"].includes(pathname);

  return (
    <SidebarProvider>
      {!hideNavAndFooter && <NavBar />}
      {!hideNavAndFooter && <SideBar />}
      <FetchProductProvider>
        <FetchBlogProvider>{children}</FetchBlogProvider>
      </FetchProductProvider>
      {!hideNavAndFooter && <Footer />}
    </SidebarProvider>
  );
}
