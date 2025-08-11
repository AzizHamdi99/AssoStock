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
        <div>

        </div>
    )
}

export default page
