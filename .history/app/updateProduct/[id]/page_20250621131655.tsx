"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = ({ params }: { params: { id: string } }) => {

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

                }))

            }
        }
        fetchProduct()

    }, [])
    return (
        <div>

        </div>
    )
}

export default page
