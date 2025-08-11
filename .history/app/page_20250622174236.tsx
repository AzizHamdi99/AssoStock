"use client"

import Navbar from "@/components/Navbar";
import { useCategoryStore } from "@/stores/useCategory";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {

  return (
    <div className="bg-[#ece3ca] min-h-screen">
      <Navbar />
      <div>
        hello
      </div>
    </div>
  );
}
