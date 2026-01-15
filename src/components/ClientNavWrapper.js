'use client';
import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

export default function ClientNavWrapper() {
  const pathname = usePathname();
  const hideNav = pathname === "/login" || pathname === "/register" || pathname === "/trip";
  return !hideNav ? <NavBar /> : null;
}
