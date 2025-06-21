"use client"
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select'
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
                    <SelectContent className=' bg-[#f3e6d4] '>
                        {products?.map((p: any, i: number) => {


                            return (
                                <SelectItem key={p._id} value={p._id}>
                                    {p?.name}
                                </SelectItem>

                            )
                        })}


                    </SelectContent>
                </Select>
            </div>
            <div>
                {transactions?.map((transaction, key) => {
                    const product = products?.find((p) => p._id === transaction.productId)
                    const category = categories?.find((cat) => cat._id === product?.categoryId)
                    return (
                        <div key={key}>
                            <div>
                                <Image
                                    src={product?.imageUrl || "/empty.webp"}
                                    width={80}
                                    height={80}
                                    alt={product?.name}
                                    className="rounded-lg object-cover w-20 h-20 border-2 border-[#f3d3bc] flex-shrink-0"
                                />
                                <div>
                                    <p>{product?.name}</p>
                                    <p>{category?.name}</p>

                                </div>


                            </div>
                            <div>
                                <p> {transaction.type === "plus" ? <p>+</p> : <p>-</p>} {transaction.quantity} {product?.unit}</p>



                            </div>

                        </div>
                    )
                })}
            </div>




        </div>
    )
}

export default page
