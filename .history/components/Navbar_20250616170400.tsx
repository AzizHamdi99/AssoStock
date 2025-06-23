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

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(prev => !prev)
    const pathName = usePathname()

    return (
        <nav className="border-b-[1px] border-[#cec19d] text-[#7c5b3b]">
            <div className="flex items-center justify-between px-6 py-4 xl:px-40">

                <div className="flex items-center gap-2">
                    <PackagePlus className='text-[#f7999b]' />
                    <p className="font-bold text-[#874d2b] text-2xl">AssoStock</p>
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
        <NavLink icon={LayoutDashboard} label="Dashboard" link={"/"} />
        <NavLink icon={ShoppingBasket} label="Products" link={"/products"} />
        <NavLink icon={PackagePlus} label="New Product" link={"/addProduct"} />
        <NavLink icon={ListTree} label="Categories" link={"/categories"} />
        <NavLink icon={HandCoins} label="Sell" link={"/sells"} />
        <NavLink icon={Receipt} label="Transactions" link={"/transactions"} />
        <NavLink icon={Warehouse} label="Refill Stock" link={"/refillStock"} />
    </>
)

const NavLink = ({ icon: Icon, label, link }: { icon: any; label: string, link: string }) => (
    <div className={`flex items-center gap-2 font-medium cursor-pointer ${pathName === link ? "bg-[#fe9fa0]" : ""}`}>
        <Icon size={20} />
        <p>{label}</p>
    </div>
)

export default Navbar
