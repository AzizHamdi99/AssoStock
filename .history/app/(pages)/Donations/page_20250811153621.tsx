"use client"
import { Input } from '@/components/ui/input'
import { useCategoryStore } from '@/stores/useCategory'
import { useProductStore } from '@/stores/useProduct'
import React, { useState } from 'react'
import Image from 'next/image'
import { HandHeart, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import toast from 'react-hot-toast'
import { useTransactionStore } from '@/stores/useTransaction'
const page = () => {
    const { products } = useProductStore()
    const { categories } = useCategoryStore()
    const { user } = useUser()
    const { donate } = useTransactionStore()

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

    const updateQuantity = (id, qty) => {
        setCart(cart.map(p => p._id === id ? { ...p, quantity: qty } : p))
    }


    const handleConfirmDonation = async () => {
        if (!user?.emailAddresses?.[0]?.emailAddress) {
            toast.error("User email not found.")
            return

        }
        try {
            const email = user?.emailAddresses[0].emailAddress

            for (const item of cart) {
                await donate(item._id, {
                    quantity: item.quantity,
                    type: "mines",
                    associationEmail: email
                })
                toast.success(`${item.name} donated successfully`)
            }
            toast.success(`successful donation`)
            setCart([])



        } catch (error) {
            console.error(error)
            toast.error("Donation failed")

        }
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
                                    <div className='p-1 bg-[#fe9d9e] rounded-full w-fit cursor-pointer' onClick={() => addToCart(p)}>
                                        <Plus size={15} />
                                    </div>
                                </div>



                            </div>
                        )

                    })}
                </div>

            </div>
            <div className='md:w-2/3 flex flex-col gap-5 border-2 border-[#dad0b5] h-fit rounded-xl p-5 pb-7'>
                <h2 className="text-xl font-bold text-[#794d2a]">Donation Cart</h2>
                {cart.length === 0 ? (
                    <div className='flex items-center justify-center flex-col '>
                        <HandHeart size={120} className='text-[#f7999b]' />
                        <p className="text-[#794d2a] text-[18px]">No products added yet.</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-separate border-spacing-y-3">
                        <thead>
                            <tr className="text-[#794d2a] font-semibold">
                                <th>Image</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {cart.map((item, i) => {
                                const category = categories?.find(c => c._id === item.categoryId)
                                return (
                                    <tr key={i} className=" p-2 text-[#794d2a]">
                                        <td>
                                            <Image src={item.imageUrl || "/empty.webp"} alt={item.name} width={50} height={50} className="rounded-md" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item._id, +e.target.value)}
                                                className="w-16 border px-2 py-1 rounded-md"
                                                min={1}
                                            />
                                        </td>
                                        <td>{item.unit}</td>
                                        <td>
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="text-red-500">
                                                <Trash2 />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
                {cart.length > 0 && (
                    <Button className="bg-[#f5857f] hover:bg-[#e56d6d] text-white w-fit mt-4" onClick={handleConfirmDonation}
                    >
                        Confirm Donation
                    </Button>
                )}
            </div>

        </div>
    )
}

export default page
