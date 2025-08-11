"use client"
import { useProductStore } from '@/stores/useProduct'
import { useCategoryStore } from '@/stores/useCategory'
import { useUser } from '@clerk/nextjs'
import { Loader2, Trash2, Pencil } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'

const Page = () => {
    const { user } = useUser()
    const { products, getProducts, loading } = useProductStore()
    const { getCategories, categories } = useCategoryStore()

    useEffect(() => {
        if (user) {
            const email = user.emailAddresses[0].emailAddress as string
            getProducts(email)
            getCategories({ email })
        }
    }, [user])

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center h-40">
                <Loader2 className="animate-spin w-8 h-8 text-[#f7999b]" />
            </div>
        )
    }

    return (
        <div className="overflow-x-scroll xl:overflow-x-hidden xl:mx-32 my-10 ">
            <h2 className="text-xl font-semibold text-[#5c381b] mb-4">Product List</h2>

            {/* Table Header */}
            <div className="grid grid-cols-[0.5fr_0.5fr_1fr_1fr_0.5fr_0.5fr_1fr_1fr] font-bold  text-[#5c381b]  rounded-t-lg">
                <p>#</p>
                <p>Image</p>
                <p>Name</p>
                <p>Description</p>
                <p>Price</p>
                <p>Qty</p>
                <p>Category</p>
                <p>Actions</p>
            </div>

            {/* Table Rows */}
            {products?.map((product, index) => {
                const category = categories?.find(cat => cat._id === product.categoryId)

                return (
                    <div
                        key={product._id}
                        className="grid grid-cols-[0.5fr_0.5fr_1fr_1fr_0.5fr_0.5fr_1fr_1fr] items-center border-b border-[#f3d3bc] px-4 py-3 text-sm text-[#4b392e]"
                    >
                        <p>{index + 1}</p>

                        <Image
                            src={product?.imageUrl || "/empty.webp"}
                            width={40}
                            height={40}
                            alt={product.name}
                            className="rounded-full object-cover w-10 h-10"
                        />

                        <p>{product.name}</p>
                        <p className="truncate">{product.description}</p>
                        <p>{product.price} €</p>
                        <p>{product.quantity ?? 0} {product.unit}</p>
                        <p>{category?.name || "N/A"}</p>

                        <div className="flex items-center gap-2">
                            <button className="bg-[#f7999b] hover:bg-[#f66f75] text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                <Pencil size={14} /> Modifier
                            </button>
                            <button className="bg-[#f3e6d4] hover:bg-[#f1d0b5] text-[#802d32] p-2 rounded">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Page
