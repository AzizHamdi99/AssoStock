"use client"
import { Input } from '@/components/ui/input'
import { useCategoryStore } from '@/stores/useCategory'
import { useProductStore } from '@/stores/useProduct'
import React from 'react'
import Image from 'next/image'
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
                                <Image
                                    src={p?.imageUrl || "/empty.webp"}
                                    width={80}
                                    height={80}
                                    alt={p.name}
                                    className="rounded-lg object-cover w-20 h-20 border-2 border-[#f3d3bc] flex-shrink-0"
                                />
                                <div>
                                    <p>{p?.name}</p>
                                    <p>{p?.name}</p>

                                </div>



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
