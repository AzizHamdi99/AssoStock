"use client"
import axios from 'axios'
import React, { useEffect } from 'react'

const page = ({ params }: { params: { id: string } }) => {

    const id = params.id
    console.log(id)

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`/api/getSingleProduct/${id}`)
            if (res.status === 200) {
                console.log(res.data)
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
