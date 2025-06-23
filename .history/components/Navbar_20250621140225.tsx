'use client'

import { UserButton, useUser } from '@clerk/nextjs'
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
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const pathName = usePathname()
    const { user, isLoaded } = useUser()

    //console.log(email, name)

    const toggleMenu = () => setIsOpen(prev => !prev)

    useEffect(() => {
        const fetchUser = async () => {
            if (!isLoaded || !user) return
            const name = user.fullName
            const email = user.emailAddresses[0]?.emailAddress
            try {
                await axios.post('/api/checkAuth', { name, email })
            } catch (error) {
                console.log("Auth error:", error)
            }
        }

        fetchUser()
    }, [isLoaded, user])


    return (
        <nav className="border-b-[1px] border-[#cec19d] text-[#7c5b3b]">
            <div className="flex items-center justify-between px-6 py-4 xl:px-32">

                {/* Logo */}
                <Link className="flex items-center gap-2" href={'/'}>
                    <PackagePlus className='text-[#f7999b]' />
                    <p className="font-bold text-[#874d2b] text-2xl">AssoStock</p>
                </Link>

                {/* Menu toggle button on mobile */}
                <button
                    onClick={toggleMenu}
                    className="xl:hidden focus:outline-none ml-auto"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Nav */}
                <div className="hidden xl:flex items-center gap-3">
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
        <NavLink icon={ShoppingBasket} label="Products" link="/Products" pathName={pathName} />
        <NavLink icon={PackagePlus} label="New Product" link="/AddProduct" pathName={pathName} />
        <NavLink icon={ListTree} label="Categories" link="/Categories" pathName={pathName} />
        <NavLink icon={HandCoins} label="Sell" link="/Sells" pathName={pathName} />
        <NavLink icon={Receipt} label="Transactions" link="/Transactions" pathName={pathName} />
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Reffil Stock</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#ece3ca]">
                <DialogHeader>
                    <DialogTitle>Stock Management</DialogTitle>
                    <DialogDescription>
                        Add quantities to available products in your stock.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Select a product
                        </Label>
                        <Input
                            id="link"

                        />
                        <Label htmlFor="link" className="sr-only">
                            Quantity to add
                        </Label>
                        <Input
                            id="link"

                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

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
        <Link href={link} className={`flex items-center gap-2 font-medium px-3 py-1 rounded-md transition ${isActive ? "bg-[#fe9fa0] " : ""}`}>
            <Icon size={20} />
            <p>{label}</p>
        </Link>
    )
}

export default Navbar
