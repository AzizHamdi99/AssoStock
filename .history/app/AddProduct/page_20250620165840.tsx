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

const Page = () => {
    const { getCategories, categories } = useCategoryStore()

    const [selectedImg, setSelectedImg] = useState<string | null>(null)

    const [data, setData] = useState({
        name: "",
        description: "",
        price: 0,
        unit: "",
        category: "",
        imageUrl: null as string | null,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
            const base64Image = reader.result as string
            setSelectedImg(base64Image)
            setData((prev) => ({
                ...prev,
                imageUrl: base64Image
            }))
        }
    }

    const handleSelectCategory = (value: string) => {
        setData((prev) => ({
            ...prev,
            category: value
        }))
    }

    const handleSubmit = () => {
        console.log("Product Data:", data)
        // Tu peux maintenant faire un POST vers une API
    }

    useEffect(() => {
        getCategories()
    }, [getCategories])

    return (
        <div className='mx-4 md:mx-32 my-10'>
            <p className='text-2xl font-bold text-[#5c381b]'>Create Product</p>
            <div className='flex flex-col gap-8 md:flex-row mt-6'>
                <div className='flex flex-col gap-4 w-full max-w-md'>
                    <input
                        type="text"
                        placeholder='Name'
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder='Description'
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder='Price'
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder='Unit (e.g. kg, piece)'
                        name="unit"
                        value={data.unit}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <Select onValueChange={handleSelectCategory}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories?.map((cat) => (
                                <SelectItem key={cat._id} value={cat.name}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button onClick={handleSubmit}>Create Product</Button>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <Image
                            src={selectedImg || "/empty.webp"}
                            width={100}
                            height={100}
                            alt="Product preview"
                            className="rounded-full border object-cover"
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                        <label
                            htmlFor="avatar-upload"
                            className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer shadow"
                        >
                            <Camera className="w-5 h-5 text-black" />
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </label>
                    </div>
                    <p className="text-sm text-gray-600">Upload product image</p>
                </div>
            </div>
        </div>
    )
}

export default Page
