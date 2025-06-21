import { create } from "zustand";
import axios from "axios";

import { toast } from "react-hot-toast";


interface Transaction {
    _id: string
    type: string
    quantity: number,
    associationEmail: string,
    productId: string
    // ...ajoute d'autres champs si besoin
}


interface TransactionsStore {
    transactions: Transaction[] | null

    loading: boolean,
    reffilStock: (id: string | undefined, data: {
        type: string
        quantity: number,
        associationEmail: string | undefined,

    }) => Promise<void>

    getTransactions: (email: string) => Promise<void>


}

export const useTransactionStore = create<TransactionsStore>((set) => ({
    transactions: null,
    loading: true,

    reffilStock: async (id, data) => {
        try {
            const res = await axios.put(`/api/refillStock/${id}`, data)
            if (res.status === 200) {
                toast.success(res.data.message || " Stock updated!")

            }


        } catch (error) {
            console.error(error)
            toast.error("Failed to update stock")

        }

    },
    getTransactions: async (email: string) => {
        try {
            const res = await axios.get(`/api/getTransactions/${email}`)
            console.log(res)
            if (res.status === 200) {
                set({ transactions: res.data })
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to fetch transactions")

        }
        finally {
            set({ loading: false })
        }

    }













}));
