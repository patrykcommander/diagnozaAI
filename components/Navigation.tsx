"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

interface MenuLinkProps {
    label: string,
    href: string,
}

export const MenuLink = ({label, href} : MenuLinkProps ) => {
    const pathName = usePathname();
    const isActive = pathName === href;
    const className = `block md:inline-block px-3 py-1 rounded-sm focus:outline-none focus:text-white focus:bg-slate-700 ${isActive ? "border-b-2 bg-slate-600": ""}`

    return (
        <Link
        href={href}
        className={clsx(className)}
        >
        {label}
        </Link>
    );
}

const Menu = () => {
    return (
        <div className="text-xl px-2 py-2 font-semibold text-slate-200">
            <MenuLink href="/patients" label="Lista pacjentow"/>
            <MenuLink href="/" label="TBA"/>
        </div>
    )
}

export default function Navbar() {
  return (
    <div className="max-w-screen-xl mx-auto flex items-center justify-between h-16 px-4 bg-primary-blue rounded-md shadow-md mt-5">
        <Menu />
    </div>
  )
}
