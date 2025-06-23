"use client"
import { useProductStore } from '@/stores/useProduct'
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'

const page = () => {
    const { user } = useUser()
    const { products, getProducts } = useProductStore()
    const fetchProducts = async () => {
        await getProducts(user?.emailAddresses[0].emailAddress as string)
    }

    useEffect(() => {

        fetchProducts()
    }, [])
    console.log(products)
    return (
        <div>


        </div>
    )
}

export default page
