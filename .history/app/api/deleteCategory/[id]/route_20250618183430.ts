import { connectDb } from "@/libs/db";
import Category from "@/models/category";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {

    try {
        await connectDb()
        const id = params.id
        const category = await Category.findByIdAndDelete({ _id: id })
        if (category) {
            return NextResponse.json({ message: "Category deleted ", satus: 200 })
        }

        const products = await Product.findOneAndDelete({ categoryId: id })

    } catch (error) {

    }


}
