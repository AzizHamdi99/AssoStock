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
import React, { useState } from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(prev => !prev)

    return (
        <nav className="border-b shadow-sm text-[#7c5b3b]">
            <div className="flex items-center justify-between px-6 py-4 xl:px-40">

                <div className="flex items-center gap-2">
                    <PackagePlus />
                    <p className="font-bold text-lg">AssoStock</p>
                </div>


                <button
                    onClick={toggleMenu}
                    className="xl:hidden focus:outline-none ml-auto"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>



                <div className="hidden xl:flex items-center gap-6">
                    <NavItems />
                </div>


                <div className="">
                    <UserButton />
                </div>
            </div>


            {isOpen && (
                <div className="xl:hidden px-6 pb-4 flex flex-col gap-4">
                    <NavItems />
                </div>
            )}

        </nav>
    )
}


const NavItems = () => (
    <>
        <NavLink icon={LayoutDashboard} label="Dashboard" />
        <NavLink icon={ShoppingBasket} label="Products" />
        <NavLink icon={PackagePlus} label="New Product" />
        <NavLink icon={ListTree} label="Categories" />
        <NavLink icon={HandCoins} label="Sell" />
        <NavLink icon={Receipt} label="Transactions" />
        <NavLink icon={Warehouse} label="Refill Stock" />
    </>
)

const NavLink = ({ icon: Icon, label }: { icon: any; label: string }) => (
    <div className="flex items-center gap-2 font-medium cursor-pointer">
        <Icon size={20} />
        <p>{label}</p>
    </div>
)

export default Navbar
