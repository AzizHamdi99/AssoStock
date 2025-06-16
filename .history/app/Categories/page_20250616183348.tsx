'use client'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
    const { user } = useUser()

    const [categories, setCategories] = useState()

    const fetchCategory = async () => {
        try {
            if (!user) return
            const res = await axios.get(`/api/getCategories/${user?.emailAddresses[0].emailAddress}`)
            console.log(res.data.cate gories)
            if (res.status === 200) {
                setCategories(res.data.categories)
            }
        } catch (error) {
            console.log(error)

        }

    }

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <div>


        </div>
    )
}

export default page
