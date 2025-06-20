import cloudinary from "@/libs/cloudinary";
import { connectDb } from "@/libs/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export async function DELETE({ params }: { params: { id: string } }) {

    try {
        await connectDb()
        const id = params.id
        const product = await Product.findById(id)

        if (!product) {
            return NextResponse.json({ message: "product Not found" }, { status: 404 })

        }
        if (product.imageUrl) {
            const publicId = product.imageUrl.split("/").pop().split(".")[0]
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log("deleting image from cloudinary")

            } catch (error) {
                console.log("error deleting from cloudinary ", error)

            }

        }

    } catch (error) {

    }

}