"use client"
import LayoutNavbar from "@/components/Layout";
import { Providers } from "@/redux/Provider";
import { usePathname } from "next/navigation";
import "./globals.css";


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
          {pathname == "/signin" ? children : <LayoutNavbar>{children}</LayoutNavbar>}
        </Providers>
      </body>
    </html>
  );
}
