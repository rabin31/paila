'use client';
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ClientFooterWrapper() {
  const pathname = usePathname();
  const hideFooter = pathname === "/login" || pathname === "/register"; // hide on login/register
  return !hideFooter ? <Footer /> : null;
}
