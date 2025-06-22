"use client"
import { Input } from '@/components/ui/input'
import { useCategoryStore } from '@/stores/useCategory'
import { useProductStore } from '@/stores/useProduct'
import React from 'react'

const page = () => {
    const { products } = useProductStore()
    const { categories } = useCategoryStore()


    return (
        <div>
            <div>
                <Input className='outline-none' />
                <div>
                    {products?.map((p, i) => {
                        const cateory = categories?.find(c => c._id === p.categoryId)
                        return (
                            <div key={i}>



                            </div>
                        )

                    })}
                </div>

            </div>
            <div>

            </div>

        </div>
    )
}

export default page
