'use client'

import { UserButton } from '@clerk/nextjs'
import {
    HandCoins,
    LayoutDashboard,
    ListTree,
    PackagePlus,
    Receipt,
    ShoppingBasket,
    Warehouse,
    Menu,
    X,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const pathName = usePathname()

    const toggleMenu = () => setIsOpen(prev => !prev)

    return (
        <nav className="border-b-[1px] border-[#cec19d] text-[#7c5b3b]">
            <div className="flex items-center justify-between px-6 py-4 xl:px-40">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <PackagePlus className='text-[#f7999b]' />
                    <p className="font-bold text-[#874d2b] text-2xl">AssoStock</p>
                </div>

                {/* Menu toggle button on mobile */}
                <button
                    onClick={toggleMenu}
                    className="xl:hidden focus:outline-none ml-auto"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Nav */}
                <div className="hidden xl:flex items-center gap-6">
                    <NavItems pathName={pathName} />
                </div>

                {/* User Button always visible */}
                <div className="ml-4">
                    <UserButton />
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="xl:hidden px-6 pb-4 flex flex-col gap-4">
                    <NavItems pathName={pathName} />
                </div>
            )}
        </nav>
    )
}

const NavItems = ({ pathName }: { pathName: string }) => (
    <>
        <NavLink icon={LayoutDashboard} label="Dashboard" link="/" pathName={pathName} />
        <NavLink icon={ShoppingBasket} label="Products" link="/products" pathName={pathName} />
        <NavLink icon={PackagePlus} label="New Product" link="/addProduct" pathName={pathName} />
        <NavLink icon={ListTree} label="Categories" link="/categories" pathName={pathName} />
        <NavLink icon={HandCoins} label="Sell" link="/sells" pathName={pathName} />
        <NavLink icon={Receipt} label="Transactions" link="/transactions" pathName={pathName} />
        <NavLink icon={Warehouse} label="Refill Stock" link="/refillStock" pathName={pathName} />
    </>
)

const NavLink = ({
    icon: Icon,
    label,
    link,
    pathName
}: {
    icon: any;
    label: string;
    link: string;
    pathName: string;
}) => {
    const isActive = pathName === link

    return (
        <Link href={link} className={`flex items-center gap-2 font-medium px-3 py-1 rounded-md transition ${isActive ? "bg-[#fe9fa0] " : "hover:bg-[#f6e8d9]"}`}>
            <Icon size={20} />
            <p>{label}</p>
        </Link>
    )
}

export default Navbar
