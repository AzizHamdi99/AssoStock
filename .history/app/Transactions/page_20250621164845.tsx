"use client"
import { useTransactionStore } from '@/stores/useTransaction'
import { useUser } from '@clerk/nextjs'

import React, { useEffect } from 'react'

const page = () => {
    const { user } = useUser()
    const { getTransactions } = useTransactionStore()
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
    return (
        <div>

        </div>
    )
}

export default page
