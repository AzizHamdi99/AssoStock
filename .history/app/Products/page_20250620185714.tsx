"use client"
import { useCategoryStore } from '@/stores/useCategory'
import { useProductStore } from '@/stores/useProduct'
import { useUser } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'

const page = () => {
    const { user } = useUser()
    const { products, getProducts, loading } = useProductStore()
    const { getCategories, categories } = useCategoryStore()


    useEffect(() => {
        if (user) {
            getProducts(user.emailAddresses[0].emailAddress as string)
            getCategories({ email: user.emailAddresses[0].emailAddress as string })

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
        <div>
            <div className='grid grid-cols-[0.5fr_0.5fr_]'>
                <p>.</p>
                <p>Image</p>
                <p>Name</p>
                <p>Description</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Category</p>
                <p>Action</p>
            </div>






        </div>
    )
}

export default page
