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
      <div className=" mx-4 flex flex-col gap-5 md:flex-row md:mx-10 lg:mx-32 my-10">
        {/* left size */}
        <div className="md:w-2/3">
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-[#e2d9be] p-4 rounded-xl flex flex-col gap-2 shadow-sm">
              <p className="text-[#bca67f] font-bold">Products in Stock</p>
              <div className="flex items-center justify-between">
                <p className="text-[#71300f] font-bold text-4xl">{products?.length}</p>
                <div className="p-3 rounded-full bg-[#f0d2be] text-[#eab3a7]">
                  <Box />
                </div>

              </div>


            </div>
            <div className="border-2 border-[#e2d9be] p-4 rounded-xl flex flex-col gap-2 shadow-sm">
              <p className="text-[#bca67f] font-bold">Number of categories</p>
              <div className="flex items-center justify-between">
                <p className="text-[#71300f] font-bold text-4xl">{categories?.length}</p>
                <div className="p-3 rounded-full bg-[#f0d2be] text-[#eab3a7]" >
                  <Tag />
                </div>

              </div>


            </div>
            <div className="border-2 border-[#e2d9be] p-4 rounded-xl flex flex-col gap-2 shadow-sm">
              <p className="text-[#bca67f] font-bold">Total stock value</p>
              <div className="flex items-center justify-between">
                <p className="text-[#71300f] font-bold text-4xl">${totalStockValue()?.toFixed(2)}</p>
                <div className="p-3 rounded-full bg-[#f0d2be] text-[#eab3a7]">
                  <DollarSign />
                </div>

              </div>


            </div>
            <div className="border-2 border-[#e2d9be] p-4 rounded-xl flex flex-col gap-2 shadow-sm">
              <p className="text-[#bca67f] font-bold">Total transactions</p>
              <div className="flex items-center justify-between">
                <p className="text-[#71300f] font-bold text-4xl">{transactions?.length}</p>
                <div className="p-3 rounded-full bg-[#f0d2be] text-[#eab3a7]">
                  <ShoppingCart />
                </div>

              </div>


            </div>

          </div>
          <div>
            hhhh
          </div>

        </div>

        {/* right side */}
        <div className="md:w-1/3 flex flex-col gap-4">
          <div className="border-2 border-[#e2d9be] p-4 py-6 rounded-xl flex flex-col shadow-sm  gap-5">

            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-[#fe9f9e] rounded-full text-[#c46564] font-bold">1</div>
              <p className="text-[#815232] font-bold">Normal stock <span className="ml-4 px-3 py-0.5 rounded-sm bg-[#dbdac6] text-[#11b61f]"> {products?.filter((p) => p?.quantity > 2).length} </span></p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-[#fe9f9e] rounded-full text-[#c46564] font-bold">2</div>
              <p className="text-[#815232] font-bold"> Low stock (≤ 2) <span className="ml-4 px-3 py-0.5 rounded-sm bg-[#f0d7bd] text-[#988f0d]">{products?.filter((p) => p?.quantity <= 2 && p.quantity > 0).length} </span></p>
            </div>
            <div className="flex gap-4 items-center">
              <p className="w-10 h-10 flex items-center justify-center bg-[#fe9f9e] rounded-full text-[#c46564] font-bold">3</p>
              <p className="text-[#815232] font-bold"> Out of stock <span className="ml-4 px-3 py-0.5 rounded-sm bg-[#f1dbc2] text-[#df0000]">{products?.filter((p) => p?.quantity === 0).length} </span></p>
            </div>


          </div>
          <div className="border-2 border-[#e2d9be] p-4 py-6 rounded-xl flex flex-col shadow-sm  gap-5">
            <p className="text-[#664525] font-bold text-2xl">Products at risk</p>
            <div className="grid grid-cols-[0.5fr_1fr_1.5fr_1fr] items-center gap-1 border-b-2 border-[#ecd7cf] py-2 text-[#af8f6e] font-bold">
              <p className="text-[#ece3ca]">.</p>
              <p>Image</p>
              <p>Name</p>
              <p>Quantity</p>
            </div>
            {products?.filter((p) => p?.quantity === 0).slice(0, 5)?.map((prod, i) => {
              return (
                <div className="grid grid-cols-[0.5fr_1fr_1.5fr_1fr] items-center gap-1 border-b-2 border-[#ecd7cf] py-2 text-[#a08871] font-semibold">

                  <p className="font-bold">{i + 1}</p>
                  <Image
                    src={prod?.imageUrl || "/empty.webp"}
                    width={40}
                    height={40}
                    alt={prod?.name}
                    className="rounded-lg object-cover h-10 w-10 border-2 border-[#f3d3bc] flex-shrink-0"
                  />
                  <p>{prod?.name}</p>
                  <p>{prod.quantity} {prod?.unit}</p>





                </div>

              )
            })}

          </div>

        </div>


      </div>
    </div>
  );
}
