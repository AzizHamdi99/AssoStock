"use client"

import Navbar from "@/components/Navbar";
import { useCategoryStore } from "@/stores/useCategory";
import { useProductStore } from "@/stores/useProduct";
import { useTransactionStore } from "@/stores/useTransaction";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { categories } = useCategoryStore()
  const { products } = useProductStore()
  const { transactions } = useTransactionStore()

  return (
    <div className="bg-[#ece3ca] min-h-screen">
      <Navbar />
      <div>
        {/* left size */}
        <div>
          <div>
            <div>
              <p></p>

            </div>

          </div>

        </div>


      </div>
    </div>
  );
}
