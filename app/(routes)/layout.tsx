import Footer from "@/components/Footer";
import Navbar from "@/components/Navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <html className="h-full">
      <body className="md:h-auto">
        <Navbar />
        <main className="flex flex-col flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
