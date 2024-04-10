import React from "react";
import "./globals.css";

type Props = {
  children: React.ReactNode
} 

export default function RootLayout({
  children,
} : Props) {
  return children;
}
