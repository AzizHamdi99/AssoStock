"use client"
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select'
import { createdDate } from '@/libs/date'
import { useCategoryStore } from '@/stores/useCategory'
import { useProductStore } from '@/stores/useProduct'
import { useTransactionStore } from '@/stores/useTransaction'
import { useUser } from '@clerk/nextjs'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'

import React, { useEffect, useState } from 'react'

const page = () => {
    const { user } = useUser()
    const { getTransactions, transactions, loading } = useTransactionStore()
    const { products } = useProductStore()
    const { categories } = useCategoryStore()
    const [selectedProduct, setSelectedProduct] = useState<string>("")
    const fetchTransactions = async () => {
        if (user) {
            await getTransactions(user?.emailAddresses[0].emailAddress)
        }

    }
    const filteredTransactions = selectedProduct && selectedProduct !== "all"
        ? transactions?.filter(t => t.productId === selectedProduct)
        : transactions

    useEffect(() => {
        if (user) {
            fetchTransactions()

        }
    }, [user])
    console.log(transactions)
    console.log(products)
    if (loading) {
        return (
            <div className="w-full flex justify-center items-center h-40">
                <Loader2 className="animate-spin w-8 h-8 text-[#f7999b]" />
            </div>
        )
    }
    return (
        <div className='mx-4 xl:mx-32 my-10'>
            <div>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#f3e6d4]">
                        <SelectItem value="all">All Products</SelectItem> {/* ✅ Not empty */}
                        {products?.map((p) => (
                            <SelectItem key={p._id} value={p._id}>
                                {p.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

            </div>
            <div className='flex flex-col gap-3 mt-5'>
                {filteredTransactions?.length === 0 && (
                    <p className='text-[#997051] text-center mt-4'>No transactions found.</p>
                )}
                {filteredTransactions?.map((transaction, key) => {
                    const product = products?.find((p) => p._id === transaction.productId)
                    const category = categories?.find((cat) => cat._id === product?.categoryId)
                    return (
                        <div key={key} className='flex items-center justify-between p-3 border-2 border-[#dad0b5] rounded-md'>
                            <div className='flex gap-3 items-center'>
                                <Image
                                    src={product?.imageUrl || "/empty.webp"}
                                    width={60}
                                    height={60}
                                    alt={product?.name}
                                    className="rounded-lg object-cover w-20 h-20 border-2 border-[#f3d3bc] flex-shrink-0"
                                />
                                <div className='flex flex-col gap-2'>
                                    <p className='text-[#997051] font-bold text-xl'>{product?.name}</p>
                                    <p className='text-[#cb713d] p-1 bg-[#edd8bb] text-center w-fit rounded-md'>{category?.name}</p>

                                </div>


                            </div>
                            <div className=' items-end flex flex-col'>
                                <div className={transaction.type === "plus" ? "flex items-center text-xlfont-bold text-[#3a806e]" : "flex items-center text-[18px] font-bold text-[#d17b76]"}>
                                    <p> {transaction.type === "plus" ? <p>+</p> : <p>-</p>} </p>
                                    <p>{transaction.quantity} {product?.unit}</p>
                                </div>
                                <p className='text-[#997051] font-medium'>{createdDate(new Date(transaction?.createdAt))}</p>


                            </div>

                        </div>
                    )
                })}
            </div>




        </div>
    )
}

export default page
