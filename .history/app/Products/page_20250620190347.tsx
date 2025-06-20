"use client"

import { useProductStore } from '@/stores/useProduct'
import { useCategoryStore } from '@/stores/useCategory'
import { useUser } from '@clerk/nextjs'
import { Loader2, Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'

const ProductList = () => {
    const { user } = useUser()
    const { products, getProducts, loading } = useProductStore()
    const { getCategories } = useCategoryStore()

    useEffect(() => {
        if (user) {
            const email = user.emailAddresses[0].emailAddress
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
        <div className="overflow-x-auto px-4 md:px-10">
            <table className="min-w-[900px] w-full border-separate border-spacing-y-3">
                <thead>
                    <tr className="text-left text-[#6b4c3b]">
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm text-[#5f4a3b] font-medium">
                    {products?.map((product, index) => (
                        <tr key={product._id} className="bg-[#f7f0e8] rounded-xl shadow-sm">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">
                                <Image
                                    src={product.imageUrl || "/empty.webp"}
                                    alt={product.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                />
                            </td>
                            <td className="p-2">{product.name}</td>
                            <td className="p-2">{product.description}</td>
                            <td className="p-2">{product.price} €</td>
                            <td className="p-2">{product.quantity ?? 0} {product.unit}</td>
                            <td className="p-2">{product.categoryId}</td>
                            <td className="p-2 flex gap-2 items-center">
                                <button className="bg-[#f7999b] text-white px-2 py-1 rounded text-sm hover:bg-[#f46a6d] flex items-center gap-1">
                                    <Pencil size={14} /> Edit
                                </button>
                                <button className="text-[#b84545] hover:text-red-600">
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductList
