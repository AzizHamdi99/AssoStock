"use client"
import React, { useEffect, useState } from 'react'
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
    const { getCategories, categories } = useCategoryStore()

    const [selectedImg, setSelectedImg] = useState(null);


    const [data, setData] = useState({
        name: "",
        description: "",
        price: 0,
        imageUrl: null,
        unit: ""
    })
    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))

    }

    const handleImageUpload = async (e: any) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = async () => {
            const base64Image = reader.result
            setSelectedImg(base64Image)
            // await updateProfile({ profilePic: base64Image })
        }

    }

    useEffect(() => {
        getCategories
        console.log(categories)

    }, [])
    return (
        <div className='mx-4 md:mx-32 my-10'>
            <p className='text-2xl font-bold text-[#5c381b]'>Create Product</p>
            <div className='flex flex-col gap-3 md:flex-row '>
                <div className='flex flex-col gap-2'>
                    <input type="text" placeholder='Name' />
                    <input type="text" placeholder='Description' />
                    <input type="number" placeholder='Price' />
                    <input type="number" placeholder='Price' />
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories?.map((cat, i) => (
                                <SelectItem value={cat.name}>{cat.name}</SelectItem>

                            ))}


                        </SelectContent>
                    </Select>



                </div><div>

                </div>
            </div>

        </div>
    )
}

export default page
