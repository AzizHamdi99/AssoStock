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
    Transactions: Transaction[] | null

    loading: boolean,
    reffilStock: (id: string, data: {
        type: string
        quantity: number,
        associationEmail: string,

    })
    

}

export const useTransactionStore = create<TransactionsStore>((set) => ({
    Transactions: null,
    loading: true,

    reffilStock: async (id, data) => {
        try {
            const res = await axios.put(`/api/refillStock/${id}`, data)
            if (res.status === 200) {
                toast.success(res.data.message || " created!")

            }


        } catch (error) {

        }

    }













}));
