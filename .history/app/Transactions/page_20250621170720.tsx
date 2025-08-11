"use client"
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select'
import { useProductStore } from '@/stores/useProduct'
import { useTransactionStore } from '@/stores/useTransaction'
import { useUser } from '@clerk/nextjs'

import { Loader2 } from 'lucide-react'

import React, { useEffect, useState } from 'react'

const page = () => {
    const { user } = useUser()
    const { getTransactions, transactions, loading } = useTransactionStore()
    const { products } = useProductStore()
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
        <div className='mx-4 md:mx-32'>
            <div>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger className="w-md">
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




        </div>
    )
}

export default page
