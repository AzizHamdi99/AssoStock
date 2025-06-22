"use client"
import { Input } from '@/components/ui/input'
import { useCategoryStore } from '@/stores/useCategory'
import { useProductStore } from '@/stores/useProduct'
import React from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'
const page = () => {
    const { products } = useProductStore()
    const { categories } = useCategoryStore()


    return (
        <div className='mx-4 xl:mx-32 my-10 flex flex-col gap-4 xl:flex-row'>
            <div className='flex flex-col gap-3'>
                <Input className='outline-none' placeholder='Search for a product' />
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
                                    <p>{cateory?.name}</p>
                                    <p>{p?.quantity} {p?.unit}</p>
                                    <div>
                                        <Plus />
                                    </div>
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
