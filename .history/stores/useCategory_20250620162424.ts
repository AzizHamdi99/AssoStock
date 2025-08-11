import { create } from "zustand";
import axios from "axios";

import { toast } from "react-hot-toast";


interface Category {
    _id: string
    name: string
    description: string
    // ...ajoute d'autres champs si besoin
}


interface CategoryStore {
    categories: Category[] | null

    loading: boolean,

    addCategory: (data: {
        name: string,
        description: string,
        email: string
    }) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
    getCategories: (data: { email: string }) => Promise<void>;

    updateTask: (editId: string, data: {
        name: string,
        description: string,

    }) => Promise<void>;



}

export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: null,
    loading: true,



    addCategory: async (data) => {
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


    deleteCategory: async (id) => {
        try {
            const res = await axios.delete(`/api/deleteCategory/${id}`)
            if (res.status == 200) {
                toast.success(res.data.message || "Category deleted!")


            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to deleting category")

        }


    },


    getCategories: async (data) => {
        set({ loading: true })
        try {
            const res = await axios.get(`/api/getCategories/${data.email}`)
            if (res.status === 200) {
                set({ categories: res.data.categories })
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to load categories")
        } finally {
            set({ loading: false })
        }



    },
    updateTask: async (editId, data) => {
        try {
            const res = await axios.put(`/api/updateCategory/${editId}`, data)
            if (res.status === 200) {
                toast.success("Category updated successfully")



            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to update category")

        }


    }












}));
