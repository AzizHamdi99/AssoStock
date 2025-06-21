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
    categories: null,
    loading: true,

    reffilStock: async (id, data) => {

    }













}));
