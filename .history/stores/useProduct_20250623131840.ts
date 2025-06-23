import { create } from "zustand";
import axios from "axios";

import { toast } from "react-hot-toast";
import Product from "@/models/product";


interface Product {
    _id: string
    name: string
    description: string
    price: number | null,
    unit: string
    quantity?: number
    associationEmail: string,
    categoryId: string,
    imageUrl?: string | null

}


interface ProductStore {
    products: Product[] | null,

    loading: boolean,

    addProduct: (data: {

        name: string
        description: string
        price: number | null,
        unit: string

        associationEmail: string,
        categoryId: string,
        imageUrl?: string | null

    }) => Promise<void>;
    getProducts: (email: string) => Promise<void>
    deleteProduct: (id: string) => Promise<void>
    updateProduct: (id: string, data: {

        name: string
        description: string
        price: number | null,
        unit: string

        associationEmail: string,
        categoryId: string,
        imageUrl?: string | null

    }) => Promise<void>




}

export const useProductStore = create<ProductStore>((set) => ({
    products: null,
    loading: true,



    addProduct: async (data: any) => {
        try {
            const res = await axios.post('/api/createProduct', data)

            if (res.status === 201) {
                toast.success(res.data.message || "Product created!")

            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to create category")
        }

    },
    getProducts: async (email) => {
        set({ loading: true })
        try {
            const res = await axios.get(`/api/getAllProducts/${email}`)
            if (res.status === 200) {
                set({ products: res.data.products, loading: false })
            }

        } catch (error) {
            console.error(error)
            set({ loading: false });

        }

    },
    deleteProduct: async (id: string) => {
        try {
            const res = await axios.delete(`/api/deleteProduct/${id}`)
            if (res.status === 200) {
                toast.success(res.data.message || "Product deleted!")

            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to delete Product")

        }
    }, updateProduct: async (id, data) => {
        try {
            const res = await axios.put(`/api/updateProduct/${id}`, data)
            if (res.status === 200) {
                toast.success(res.data.message || "Product Upadated!")
            }

        } catch (error) {
            console.error(error)
            toast.error("Failed to delete Product")

        }
    }

















}));
