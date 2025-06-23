"use client"

import Navbar from "@/components/Navbar";
import { useCategoryStore } from "@/stores/useCategory";
import { useProductStore } from "@/stores/useProduct";
import { useTransactionStore } from "@/stores/useTransaction";
import { Box, DollarSign, Loader2, ShoppingCart, Tag } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { categories, loading } = useCategoryStore()
  const { products } = useProductStore()
  const { transactions } = useTransactionStore()

  // if (!categories || !products || !transactions) {
  //   return (
  //     <div className="w-full flex justify-center items-center h-40">
  //       <Loader2 className="animate-spin w-8 h-8 text-[#f7999b]" />
  //     </div>
  //   )
  // }

  const totalStockValue = () => {
    if (products) return products?.reduce((total, item) => total + item?.quantity * item?.price, 0)
  }



  return (
    <div className="bg-[#ece3ca] min-h-screen">
      <Navbar />
      <div className="flex flex-col gap-5 md:flex-row md:mx-10 lg:mx-32 my-10">
        {/* left size */}
        <div className="w-2/3">
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-[#e2d9be] p-4 rounded-xl flex flex-col gap-2">
              <p className="text-[#c6b79e] font-bold">Products in Stock</p>
              <div className="flex items-center justify-between">
                <p>{products?.length}</p>
                <div>
                  <Box />
                </div>

              </div>


            </div>
            <div className="border-2 border-[#e2d9be] p-4 rounded-xl flex flex-col gap-2">
              <p>Number of categories</p>
              <div className="flex items-center justify-between">
                <p>{categories?.length}</p>
                <div >
                  <Tag />
                </div>

              </div>


            </div>
            <div className="border-2 border-[#e2d9be] p-4 rounded-xl flex flex-col gap-2">
              <p>Total stock value</p>
              <div className="flex items-center justify-between">
                <p>${totalStockValue()?.toFixed(2)}</p>
                <div>
                  <DollarSign />
                </div>

              </div>


            </div>
            <div className="border-2 border-[#e2d9be] p-4 rounded-xl flex flex-col gap-2">
              <p>Total transactions</p>
              <div className="flex items-center justify-between">
                <p>{transactions?.length}</p>
                <div>
                  <ShoppingCart />
                </div>

              </div>


            </div>

          </div>

        </div>

        {/* right side */}
        <div className="md:w-1/3">
          <div>

            <div>
              <p>1</p>
              <p>Normal stock <span> {products?.filter((p) => p?.quantity > 2).length} </span></p>
            </div>
            <div>
              <p>2</p>
              <p> Low stock (≤ 2) <span>{products?.filter((p) => p?.quantity <= 2 && p.quantity > 0).length} </span></p>
            </div>
            <div>
              <p>3</p>
              <p> Out of stock <span>{products?.filter((p) => p?.quantity === 0).length} </span></p>
            </div>


          </div>
          <div>
            <p>Product at risk</p>
            <div>
              <p>.</p>
              <p>Image</p>
              <p>Name</p>
              <p>Quantity</p>
            </div>
            {products?.filter((p) => p?.quantity === 0).slice(0, 5)?.map((prod, i) => {
              return (
                <div>
                  <div>
                    <p>{i + 1}</p>
                    <Image
                      src={prod?.imageUrl || "/empty.webp"}
                      width={80}
                      height={80}
                      alt={prod?.name}
                      className="rounded-lg object-cover w-20 h-20 border-2 border-[#f3d3bc] flex-shrink-0"
                    />
                    <p>{prod?.name}</p>
                    <p>{prod.quantity} {prod?.unit}</p>


                  </div>

                </div>

              )
            })}

          </div>

        </div>


      </div>
    </div>
  );
}
