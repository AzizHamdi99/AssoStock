'use client'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const page = () => {
    const { user } = useUser()

    const [categories, setCategories] = useState()
    const [loading, setLoading] = useState(false)

    const fetchCategory = async () => {
        if (!user) return
        setLoading(true)
        try {

            const res = await axios.get(`/api/getCategories/${user?.emailAddresses[0].emailAddress}`)
            console.log(res.data.categories)
            if (res.status === 200) {
                setCategories(res.data.categories)
            }
        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchCategory()
    }, [])

    if (loading) {
        return (<div className="w-full flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-8 h-8 text-[#f7999b]" />
        </div>)
    }
    return (
        <div className='md:mx-32 my-10'>
            <Dialog>
                <form>
                    <DialogTrigger asChild className=''>
                        <Button variant="outline" className='bg-[#f7999b] '>Add Category</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create new category</DialogTitle>

                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name-1">Title</Label>
                                <Input id="name-1" name="name" placeholder='Title' />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Description</Label>
                                <Input id="username-1" name="username" placeholder='Description' />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className='bg-[]'>Create</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>






        </div>
    )
}

export default page
