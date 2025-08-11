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
    Image,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useProductStore } from '@/stores/useProduct'
import { useCategoryStore } from '@/stores/useCategory'
import { EmailAddress } from '@clerk/nextjs/server'
import Product from '@/models/product'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const pathName = usePathname()
    const { user, isLoaded } = useUser()
    const { getProducts, products } = useProductStore()
    const { categories, getCategories } = useCategoryStore()
    //console.log(email, name)
    const [selectedProduct, setSelectedProduct] = useState<string>("")
    const [qte, setQte] = useState<number>(0)

    const toggleMenu = () => setIsOpen(prev => !prev)

    const selected = products?.find((prod) => prod._id === selectedProduct)
    const category = categories?.find((cat: any) => cat._id === selected?.categoryId)

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

    useEffect(() => {
        if (user) {
            getCategories({ email: user?.emailAddresses[0].emailAddress as string })
            getProducts(user?.emailAddresses[0].emailAddress)


        }

    }, [user])


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
                    <NavItems pathName={pathName} products={products} categories={categories} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} qte={qte} setQte={setQte} selected={selected} category={category} />
                </div>

                {/* User Button always visible */}
                <div className="ml-4">
                    <UserButton />
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="xl:hidden px-6 pb-4 flex flex-col gap-4">
                    <NavItems pathName={pathName} products={products} categories={categories} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} qte={qte} setQte={setQte} selected={selected} category={category} />
                </div>
            )}
        </nav>
    )
}

const NavItems = ({ pathName, products, categories, selectedProduct,
    setSelectedProduct,
    qte,
    setQte, selected, category }: { pathName: string, products: any, categories: any, selectedProduct: any, setSelectedProduct: any, qte: any, setQte: any, selected: any, category: any }) => (

    <>
        <NavLink icon={LayoutDashboard} label="Dashboard" link="/" pathName={pathName} />
        <NavLink icon={ShoppingBasket} label="Products" link="/Products" pathName={pathName} />
        <NavLink icon={PackagePlus} label="New Product" link="/AddProduct" pathName={pathName} />
        <NavLink icon={ListTree} label="Categories" link="/Categories" pathName={pathName} />
        <NavLink icon={HandCoins} label="Sell" link="/Sells" pathName={pathName} />
        <NavLink icon={Receipt} label="Transactions" link="/Transactions" pathName={pathName} />
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline">Reffil Stock</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#ece3ca] text-[#794422]">
                <DialogHeader>
                    <DialogTitle className='text-[#794422] font-bold'>Stock Management</DialogTitle>
                    <DialogDescription>
                        Add quantities to available products in your stock.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <p> Select a product</p>
                        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                            <SelectTrigger className="w-full ">
                                <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                            <SelectContent className=' bg-[#f3e6d4]'>
                                {products?.map((p: any, i: number) => {

                                    return (
                                        <SelectItem key={p._id} value={p._id}>
                                            {p?.name} - {category?.name}
                                        </SelectItem>

                                    )
                                })}


                            </SelectContent>
                        </Select>
                        {selectedProduct && (
                            <div className='flex items-center  border-[1px] w-full gap-4 border-[#e9ddc5] rounded-xl'>
                                <Image
                                    src={selected?.imageUrl || "/empty.webp"}
                                    width={80}
                                    height={80}
                                    alt={selected?.name}
                                    className="rounded-lg object-cover w-20 h-20 flex-shrink-0"
                                />
                                <div className='flex flex-col gap-1'>
                                    <p className='text-[#9f450c] font-bold'>{selected?.name}</p>
                                    <p className='text-[#ba7142] p-1 bg-[#efd8bb] w-fit'>{category?.name}</p>
                                    <p className='text-[#ba7142] p-1 bg-[#efd8bb] w-fit'>{selected?.quantity} {selected?.unit}</p>

                                </div>


                            </div>
                        )}

                        <p> Quantity to add</p>
                        <Input
                            id="link"
                            type='number'
                            value={qte} onChange={(e) => setQte(Number(e.target.value))}

                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" className='bg-[#e99291] text-[#9f4648] cursor-pointer'>
                            Add to stock
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
