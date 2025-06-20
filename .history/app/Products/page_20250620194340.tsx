"use client"
import { useProductStore } from '@/stores/useProduct'
import { useCategoryStore } from '@/stores/useCategory'
import { useUser } from '@clerk/nextjs'
import { Loader2, Trash2, Pencil, MoreVertical, Eye } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const { user } = useUser()
    const { products, getProducts, loading, deleteProduct } = useProductStore()
    const { getCategories, categories } = useCategoryStore()
    const [activeDropdown, setActiveDropdown] = useState(null)

    useEffect(() => {
        if (user) {
            const email = user.emailAddresses[0].emailAddress as string
            getProducts(email)
            getCategories({ email })
        }
    }, [user, products])

    const toggleDropdown = (productId) => {
        setActiveDropdown(activeDropdown === productId ? null : productId)
    }

    const handleDeleteProduct = (id: string) => {
        deleteProduct(id)
        getProducts(user?.emailAddresses[0].emailAddress as string)

    }

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center h-40">
                <Loader2 className="animate-spin w-8 h-8 text-[#f7999b]" />
            </div>
        )
    }

    return (
        <div className="p-4 lg:p-6 xl:mx-32 my-4 lg:my-10">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#5c381b] mb-2">
                    Product Management
                </h2>
                <p className="text-[#a3886d] text-sm lg:text-base">
                    Manage your product inventory ({products?.length || 0} items)
                </p>
            </div>

            {/* Desktop Table View - Hidden on mobile */}
            <div className="hidden lg:block">
                <div className="bg-white rounded-xl shadow-sm border border-[#f3d3bc] overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-[0.3fr_0.4fr_1.2fr_1.5fr_0.6fr_0.6fr_1fr_0.8fr] bg-gradient-to-r from-[#f8f4f0] to-[#f3e6d4] px-6 py-4 font-semibold text-[#5c381b] text-sm border-b border-[#f3d3bc]">
                        <span>#</span>
                        <span>Image</span>
                        <span>Product Name</span>
                        <span>Description</span>
                        <span>Price</span>
                        <span>Stock</span>
                        <span>Category</span>
                        <span>Actions</span>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-[#f3d3bc]">
                        {products?.map((product, index) => {
                            const category = categories?.find(cat => cat._id === product.categoryId)

                            return (
                                <div
                                    key={product._id}
                                    className="grid grid-cols-[0.3fr_0.4fr_1.2fr_1.5fr_0.6fr_0.6fr_1fr_0.8fr] items-center px-6 py-4 hover:bg-[#fefcfa] transition-colors duration-200"
                                >
                                    <span className="text-[#a3886d] font-medium">{index + 1}</span>

                                    <div className="flex justify-start">
                                        <Image
                                            src={product?.imageUrl || "/empty.webp"}
                                            width={48}
                                            height={48}
                                            alt={product.name}
                                            className="rounded-lg object-cover w-12 h-12 border-2 border-[#f3d3bc]"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-[#5c381b] truncate">{product.name}</h3>
                                    </div>

                                    <div>
                                        <p className="text-[#a3886d] text-sm line-clamp-2">{product.description}</p>
                                    </div>

                                    <div>
                                        <span className="font-bold text-[#5c381b]">{product.price} €</span>
                                    </div>

                                    <div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${(product.quantity ?? 0) > 10
                                            ? 'bg-green-100 text-green-800'
                                            : (product.quantity ?? 0) > 0
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {product.quantity ?? 0} {product.unit}
                                        </span>
                                    </div>

                                    <div>
                                        <span className="px-2 py-1 bg-[#f3e6d4] text-[#5c381b] rounded-full text-xs font-medium">
                                            {category?.name || "N/A"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button className="bg-[#fc9c9e] hover:bg-[#f66f75] text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors duration-200">
                                            <Pencil size={12} /> Edit
                                        </button>
                                        <button className="bg-[#f3e6d4] hover:bg-[#f1d0b5] text-[#802d32] p-1.5 rounded-lg transition-colors duration-200" onClick={() => handleDeleteProduct(product._id)}>
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile Card View - Hidden on desktop */}
            <div className="lg:hidden space-y-4">
                {products?.map((product, index) => {
                    const category = categories?.find(cat => cat._id === product.categoryId)

                    return (
                        <div
                            key={product._id}
                            className="bg-white rounded-xl border border-[#f3d3bc] shadow-sm overflow-hidden"
                        >
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-[#f8f4f0] to-[#f3e6d4] px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="bg-[#fc9c9e] text-white text-xs font-bold px-2 py-1 rounded-full">
                                        #{index + 1}
                                    </span>
                                    <h3 className="font-semibold text-[#5c381b] truncate">{product.name}</h3>
                                </div>
                                <div className="relative">
                                    <button
                                        onClick={() => toggleDropdown(product._id)}
                                        className="p-2 hover:bg-[#f1d0b5] rounded-lg transition-colors duration-200"
                                    >
                                        <MoreVertical size={16} className="text-[#5c381b]" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {activeDropdown === product._id && (
                                        <div className="absolute right-0 top-full mt-1 bg-white border border-[#f3d3bc] rounded-lg shadow-lg z-10 min-w-[140px]">
                                            <button className="w-full px-3 py-2 text-left hover:bg-[#f8f4f0] flex items-center gap-2 text-sm text-[#5c381b]">
                                                <Pencil size={14} /> Edit
                                            </button>
                                            <button className="w-full px-3 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-sm text-red-600">
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-4">
                                <div className="flex gap-4 mb-4">
                                    <Image
                                        src={product?.imageUrl || "/empty.webp"}
                                        width={80}
                                        height={80}
                                        alt={product.name}
                                        className="rounded-lg object-cover w-20 h-20 border-2 border-[#f3d3bc] flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[#a3886d] text-sm mb-2 line-clamp-3">{product.description}</p>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-1 bg-[#f3e6d4] text-[#5c381b] rounded-full text-xs font-medium">
                                                {category?.name || "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="flex items-center justify-between pt-3 border-t border-[#f3d3bc]">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="text-xs text-[#a3886d] mb-1">Price</p>
                                            <p className="font-bold text-[#5c381b]">{product.price} €</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#a3886d] mb-1">Stock</p>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${(product.quantity ?? 0) > 10
                                                ? 'bg-green-100 text-green-800'
                                                : (product.quantity ?? 0) > 0
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {product.quantity ?? 0} {product.unit}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button className="bg-[#fc9c9e] hover:bg-[#f66f75] text-white px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors duration-200">
                                            <Pencil size={12} /> Edit
                                        </button>
                                        <button className="bg-[#f3e6d4] hover:bg-[#f1d0b5] text-[#802d32] p-2 rounded-lg transition-colors duration-200">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Empty State */}
            {!products || products.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-[#f3e6d4] rounded-full flex items-center justify-center">
                        <Image
                            src="/empty.webp"
                            width={40}
                            height={40}
                            alt="No products"
                            className="opacity-50"
                        />
                    </div>
                    <h3 className="text-lg font-semibold text-[#5c381b] mb-2">No products found</h3>
                    <p className="text-[#a3886d] text-sm">Start by adding your first product to the inventory.</p>
                </div>
            ) : null}
        </div>
    )
}

export default Page