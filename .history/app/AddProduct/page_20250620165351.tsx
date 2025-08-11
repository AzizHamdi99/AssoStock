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
import { Camera } from 'lucide-react'
import Image from 'next/image'


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



                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <Image
                            src={selectedImg ? selectedImg : "/nppdp.webp"}
                            width={100}
                            height={100}
                            alt="Profile"
                            className="rounded-full object-cover border-4 "
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                        <label
                            htmlFor="avatar-upload"
                            className={`
                             absolute bottom-0 right-0 
                             bg-base-content hover:scale-105
                             p-2 rounded-full cursor-pointer 
                             transition-all duration-200 : ""}
                           `}
                        >
                            <Camera className="w-5 h-5 text-base-200 border-2 rounded-full" />
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}

                            />
                        </label>
                    </div>
                </div>

            </div>
            )
}

            export default page
