"use client"
import { useTransactionStore } from '@/stores/useTransaction'
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'

const page = () => {
    const { user } = useUser()
    const { getTransactions } = useTransactionStore()
    useEffect(() => {
        if (user) {
            getTransactions(user?.emailAddresses[0].emailAddress)
        }
    }, [])
    return (
        <div>

        </div>
    )
}

export default page
