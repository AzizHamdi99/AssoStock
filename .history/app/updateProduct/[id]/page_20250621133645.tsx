"use client"

import { useCategoryStore } from '@/stores/useCategory'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select' // ← Utilise le composant compatible avec shadcn/ui
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Camera, Loader2 } from 'lucide-react'

const Page = ({ params }: { params: { id: string } }) => {
    const { categories, getCategories } = useCategoryStore()
    const { user } = useUser()
    const id = params.id

    const [data, setData] = useState({
        name: "",
        description: "",
        price: null,
        unit: "",
        categoryId: "",
        imageUrl: null as string | null,
        associationEmail: ""
    })

    const [selectedImg, setSelectedImg] = useState<string | null>(null)
    const units = ["Gram", "Kilogram", "Liter", "Meter", "Centimeter", "Hour", "Pieces"]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            categoryId: value
        }))
    }

    const handleSelectUnit = (value: string) => {
        setData((prev) => ({
            ...prev,
            unit: value
        }))
    }

    const fetchCategory = async () => {
        if (!user) return
        await getCategories({ email: user.emailAddresses[0].emailAddress })
    }

    useEffect(() => {
        if (user) {
            setData((prev) => ({
                ...prev,
                associationEmail: user.emailAddresses[0].emailAddress
            }))
            fetchCategory()
        }
    }, [user])

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`/api/getSingleProduct/${id}`)
            if (res.status === 200) {
                setData((prev) => ({
                    ...prev,
                    name: res.data.name,
                    description: res.data.description,
                    price: res.data.price,
                    unit: res.data.unit,
                    categoryId: res.data.categoryId,
                    associationEmail: res.data.associationEmail,
                    imageUrl: res.data.imageUrl
                }))
                setSelectedImg(res.data.imageUrl)
            }
        }
        fetchProduct()
    }, [id])
    useEffect(() => {
        console.log(data)
    }, [data])

    if (!user || !categories) {
        return (
            <div className="w-full flex justify-center items-center h-40">
                <Loader2 className="animate-spin w-8 h-8 text-[#f7999b]" />
            </div>
        )
    }

    return (
        <div className='mx-4 md:mx-6 xl:mx-32 my-10'>
            <p className='text-2xl font-bold text-[#5c381b]'>Edit Product</p>
            <div className='flex flex-col'>
                <div className='flex flex-col gap-8 md:flex-row mt-6 font-medium'>
                    <div className='flex flex-col gap-4 w-full max-w-md text-[#8f795a]'>
                        <input
                            type="text"
                            placeholder='Name'
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <textarea
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
                            value={data.price ?? ""}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />

                        <Select onValueChange={handleSelectCategory} value={data.categoryId}>
                            <SelectTrigger className="w-full cursor-pointer border p-2 rounded  text-left">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent className='bg-[#f3e6d4]'>
                                {categories?.map((cat) => (
                                    <SelectItem key={cat._id} value={cat._id} className='cursor-pointer hover:text-[#8f795a]'>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select onValueChange={handleSelectUnit} value={data.unit}>
                            <SelectTrigger className="w-full cursor-pointer border p-2 rounded  text-left">
                                <SelectValue placeholder="Select Unit" />
                            </SelectTrigger>
                            <SelectContent className='bg-[#f3e6d4]'>
                                {units.map((unit) => (
                                    <SelectItem key={unit} value={unit} className='cursor-pointer hover:text-[#8f795a]'>
                                        {unit}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className='p-12 max-w-md border-[#e2b1a1] border-2 rounded-xl flex items-center justify-center'>
                            <div className="relative">
                                <Image
                                    src={selectedImg || "/empty.webp"}
                                    width={120}
                                    height={120}
                                    alt="Product preview"
                                    className="rounded-full border object-cover"
                                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
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
                        </div>
                    </div>
                </div>

                <Button className='bg-[#de8a8b] max-w-md h-10 cursor-pointer text-[#802d32] mt-6'>
                    Save Product
                </Button>
            </div>
        </div>
    )
}

export default Page
