"use client";
import LayoutNavbar from "@/components/Layout";
import { Providers } from "@/redux/Provider";
import { usePathname } from "next/navigation";
import "./globals.css";
import "@/components/styles/app.scss";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        <Providers>
          {pathname == "/" ? children : <LayoutNavbar>{children}</LayoutNavbar>}
        </Providers>
      </body>
      <Toaster richColors closeButton position="top-right" />
    </html>
  );
}
