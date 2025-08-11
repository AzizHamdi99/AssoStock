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

export const useTaskStore = create<CategoryStore>((set) => ({
    categories: null,
    loading: true,



    addCategory: async (data) => {

    },


    deleteCategory: async (id) => {

    },


    getCategories: async (userId) => {



    },
    updateTask: async (editId, data) => {

    }












}));
