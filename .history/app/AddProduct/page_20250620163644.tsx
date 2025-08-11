"use client"
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useCategoryStore } from '@/stores/useCategory'

const page = () => {
    const { categories } = useCategoryStore()
    return (
        <div className='mx-4 md:mx-32 my-10'>
            <p>Create Product</p>
            <div>
                <div>
                    <input type="text" placeholder='Name' />
                    <input type="text" placeholder='Description' />
                    <input type="number" placeholder='Price' />
                    <input type="number" placeholder='Price' />
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories?.map((cat, i) => (
                                <SelectItem value={cat.name}>{cat.name}</SelectItem>

                            ))}


                        </SelectContent>
                    </Select>
                    <Button />


                </div>
            </div>

        </div>
    )
}

export default page
