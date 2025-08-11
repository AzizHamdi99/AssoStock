"use client"

import { useCategoryStore } from "@/stores/useCategory";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { getCategories } = useCategoryStore()

  useEffect(() => {
    getCategories

  }, [])
  return (
    <div>
      hello

    </div>
  );
}
