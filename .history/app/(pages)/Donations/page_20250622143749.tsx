"use client"
import { Input } from '@/components/ui/input'
import { useCategoryStore } from '@/stores/useCategory'
import { useProductStore } from '@/stores/useProduct'
import React, { useState } from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'
const page = () => {
    const { products } = useProductStore()
    const { categories } = useCategoryStore()

    const [searchTerm, setSearchTerm] = useState("")
    const filteredProducts = products?.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const [cart, setCart] = useState([])
    const addToCart = (product: any) => {
        if (!cart.find(p => p._id === product._id)) {
            setCart([...cart, { ...product, quantity: 1 }])
        }
    }
    const removeFromCart = (id: any) => {
        setCart(cart.filter(p => p._id !== id))
    }



    return (
        <div className='mx-4 md:mx-10 xl:mx-32 my-10 flex flex-col gap-4 md:flex-row'>
            <div className='flex flex-col gap-3 md:w-1/3'>
                <Input className='outline-none'
                    placeholder='Search for a product'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                <div className='flex flex-col gap-5'>
                    {filteredProducts?.map((p, i) => {
                        const cateory = categories?.find(c => c._id === p.categoryId)
                        return (
                            <div key={i} className='flex items-center gap-5 border-2 border-[#dad0b5] rounded-xl p-3'>
                                <Image
                                    src={p?.imageUrl || "/empty.webp"}
                                    width={100}
                                    height={100}
                                    alt={p.name}
                                    className="rounded-lg object-cover w-20 h-20 border-2 border-[#f3d3bc] flex-shrink-0"
                                />
                                <div className='flex flex-col gap-1'>
                                    <p className='text-[#794d2a] font-bold text-[20px]'>{p?.name}</p>
                                    <p className='text-[#ce550f] p-1 bg-[#edd8bb] text-center w-fit rounded-md text-sm'>{cateory?.name}</p>
                                    <p className='text-[#ce550f] p-1 bg-[#edd8bb] text-center w-fit rounded-md text-sm'>{p?.quantity} {p?.unit}</p>
                                    <div className='p-1 bg-[#fe9d9e] rounded-full w-fit cursor-pointer'>
                                        <Plus size={15} />
                                    </div>
                                </div>



                            </div>
                        )

                    })}
                </div>

            </div>
            <div>
                hhh

            </div>

        </div>
    )
}

export default page
