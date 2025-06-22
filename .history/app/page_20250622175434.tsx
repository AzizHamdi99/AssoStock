"use client"

import Navbar from "@/components/Navbar";
import { useCategoryStore } from "@/stores/useCategory";
import { useProductStore } from "@/stores/useProduct";
import { useTransactionStore } from "@/stores/useTransaction";
import { Box, DollarSign, Loader2, ShoppingCart, Tag } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { categories } = useCategoryStore()
  const { products } = useProductStore()
  const { transactions } = useTransactionStore()

  // if (!categories || !products || !transactions) {
  //   return (
  //     <div className="w-full flex justify-center items-center h-40">
  //       <Loader2 className="animate-spin w-8 h-8 text-[#f7999b]" />
  //     </div>
  //   )
  // }

  return (
    <div className="bg-[#ece3ca] min-h-screen">
      <Navbar />
      <div>
        {/* left size */}
        <div>
          <div>
            <div>
              <p>Products in Stock</p>
              <div>
                <p>{products?.length}</p>
                <div>
                  <Box />
                </div>

              </div>


            </div>
            <div>
              <p>Number of categories</p>
              <div>
                <p>{categories?.length}</p>
                <div>
                  <Tag />
                </div>

              </div>


            </div>
            <div>
              <p>Total stock value</p>
              <div>
                <p></p>
                <div>
                  <DollarSign />
                </div>

              </div>


            </div>
            <div>
              <p>Total transactions</p>
              <div>
                <p>{transactions?.length}</p>
                <div>
                  <ShoppingCart />
                </div>

              </div>


            </div>

          </div>

        </div>


      </div>
    </div>
  );
}
