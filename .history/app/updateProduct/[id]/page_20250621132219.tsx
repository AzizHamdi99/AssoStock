"use client"
import { useCategoryStore } from '@/stores/useCategory'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = ({ params }: { params: { id: string } }) => {
    const { categories, getCategories } = useCategoryStore()

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


            }
        }
        fetchProduct()


    }, [])
    console.log(data)
    return (
        <div className='mx-4 md:mx-6 xl:mx-32 my-10'>
            <p className='text-2xl font-bold text-[#5c381b]'>Create Product</p>
            <div className='flex flex-col  ' >
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
                            value={data.price}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />

                        <Select onValueChange={handleSelectCategory}>
                            <SelectTrigger className="w-full cursor-pointer">
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
                        <Select onValueChange={handleSelectUnit}>
                            <SelectTrigger className="w-full cursor-pointer">
                                <SelectValue placeholder="Select Unit" />
                            </SelectTrigger>
                            <SelectContent className='bg-[#f3e6d4]'>
                                {units?.map((unit, i) => (
                                    <SelectItem key={i} value={unit} className='cursor-pointer hover:text-[#8f795a]'>
                                        {unit}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>


                    </div>

                    <div className="flex flex-col gap-4">
                        <div className='p-12 max-w-md border-[#e2b1a1] border-2 rounded-xl md:p-22 flex items-center justify-center'>
                            <div className="relative">
                                <Image
                                    src={selectedImg || "/empty.webp"}
                                    width={100}
                                    height={100}
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
                <Button onClick={handleSubmit} className='bg-[#de8a8b] max-w-md h-10 cursor-pointer text-[#802d32]'>Create Product</Button>
            </div>
        </div>
    )
}

export default page
