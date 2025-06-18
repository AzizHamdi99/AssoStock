'use client'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { Loader2, Pencil, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import toast from 'react-hot-toast'

interface Category {
    _id: string
    name: string
    description: string
    // ...ajoute d'autres champs si besoin
}

const Page = () => {
    const { user } = useUser()
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const fetchCategory = async () => {
        if (!user) return
        setLoading(true)
        try {
            const res = await axios.get(`/api/getCategories/${user.emailAddresses[0].emailAddress}`)
            if (res.status === 200) {
                setCategories(res.data.categories)
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to load categories")
        } finally {
            setLoading(false)
        }
    }

    const handleCreateCategory = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        try {
            const res = await axios.post('/api/addCategory', {
                name,
                description,
                email: user.emailAddresses[0].emailAddress
            })

            if (res.status === 201) {
                toast.success(res.data.message || "Category created!")
                setName("")
                setDescription("")
                fetchCategory()
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to create category")
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [user])

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center h-40">
                <Loader2 className="animate-spin w-8 h-8 text-[#f7999b]" />
            </div>
        )
    }

    return (
        <div className='md:mx-32 my-10'>
            <Dialog>

                <DialogTrigger asChild>
                    <Button variant="outline" className='bg-[#f7999b]'>Add Category</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-[#ece3ca] text-[#7c5b3b]">
                    <DialogHeader>
                        <DialogTitle className='mb-1 font-bold'>Create new category</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <Input placeholder='Title' value={name} onChange={e => setName(e.target.value)} />
                        <Input placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={handleCreateCategory} className='bg-[#f7999b]'>Create</Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>


            <div className="mt-6 flex flex-col gap-3 ">
                {categories.map(cat => (
                    <div key={cat._id} className="bg-[#f6eedd] p-4 rounded shadow text-[#7c5b3b] flex items-center justify-between">
                        <div>
                            <h2 className="font-bold">{cat.name}</h2>
                            <p>{cat.description}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <Dialog>

                                <DialogTrigger asChild className=''>
                                    <Button variant="outline" className='bg-[#e3d7b4]'><Pencil /></Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-[#ece3ca] text-[#7c5b3b]">
                                    <DialogHeader>
                                        <DialogTitle className='mb-1 font-bold'>Update category</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <Input placeholder='Title' value={cat.name} onChange={e => setName(e.target.value)} />
                                        <Input placeholder='Description' value={cat.description} onChange={e => setDescription(e.target.value)} />
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit" onClick={handleCreateCategory} className='bg-[#f7999b]'>Create</Button>
                                    </DialogFooter>
                                </DialogContent>

                            </Dialog>
                            <div className='bg-[#fd6265] p-1.5'>
                                <Trash2 />
                            </div>


                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page
