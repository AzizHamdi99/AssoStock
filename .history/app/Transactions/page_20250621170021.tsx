"use client"
import { useProductStore } from '@/stores/useProduct'
import { useTransactionStore } from '@/stores/useTransaction'
import { useUser } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'

import React, { useEffect } from 'react'

const page = () => {
    const { user } = useUser()
    const { getTransactions, transactions, loading } = useTransactionStore()
    const { products } = useProductStore()
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
        <div>


        </div>
    )
}

export default page
