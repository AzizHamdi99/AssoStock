import { connectDb } from "@/libs/db"
import Product from "@/models/product"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDb()
        const id = params.id

        const {
            name,
            description,
            price,
            unit,
            imageUrl,
            categoryId,
            associationEmail
        } = await req.json()

        if (
            !name || !description || price === null || !unit || !imageUrl || !categoryId || !associationEmail
        ) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 })
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                unit,
                imageUrl,
                categoryId,
                associationEmail
            },
            { new: true }
        )

        if (!updatedProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 })
        }

        return NextResponse.json(updatedProduct, { status: 200 })
    } catch (error) {
        console.error("Error updating product:", error)
        return NextResponse.json(
            { message: "Internal Server Error", error },
            { status: 500 }
        )
    }
}
