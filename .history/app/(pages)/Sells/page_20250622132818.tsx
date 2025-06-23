"use client"
import { Input } from '@/components/ui/input'
import { useProductStore } from '@/stores/useProduct'
import React from 'react'

const page = () => {
    const { products } = useProductStore()


    return (
        <div>
            <div>
                <Input className='outline-none' />

            </div>
            <div>

            </div>

        </div>
    )
}

export default page
