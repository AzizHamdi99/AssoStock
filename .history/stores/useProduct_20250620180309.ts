import { create } from "zustand";
import axios from "axios";

import { toast } from "react-hot-toast";
import Product from "@/models/product";


interface Product {
    _id: string
    name: string
    description: string
    price: number,
    unit: string
    quantity?: number
    associationEmail: string,
    categoryId: string,
    imageUrl: string | null

}


interface ProductStore {
    products: []Product | null

loading: boolean,

    addProduct: (data: {

        name: string
        description: string
        price: number,
        unit: string

        associationEmail: string,
        categoryId: string,
        imageUrl: string | null

    }) => Promise<void>;
    



}

export const useCategoryStore = create<ProductStore>((set) => ({
    products: null,
    loading: true,



    addProduct: async (data: any) => {
        try {
            const res = await axios.post('/api/addCategory', data)

            if (res.status === 201) {
                toast.success(res.data.message || "Category created!")

            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to create category")
        }

    },

















}));
