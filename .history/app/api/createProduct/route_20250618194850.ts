import cloudinary from "@/libs/cloudinary";
import { connectDb } from "@/libs/db";
import Association from "@/models/assosiation";
import Category from "@/models/category";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb();

        const { name, description, price, unit, imageUrl, categoryId, associationId } = await req.json();


        if (!name || !description || !price || !unit || !imageUrl || !categoryId || !associationId) {
            return NextResponse.json({ message: "Missing fields", status: 400 });
        }


        const association = await Association.findById(associationId);
        if (!association) {
            return NextResponse.json({ message: "Association not found", status: 404 });
        }


        const category = await Category.findById(categoryId);
        if (!category) {
            return NextResponse.json({ message: "Category not found", status: 404 });
        }


        const uploadResponse = await cloudinary.uploader.upload(imageUrl);
        if (!uploadResponse?.secure_url) {
            return NextResponse.json({ message: "Image upload failed", status: 500 });
        }


        const newProduct = await Product.create({
            name,
            description,
            price,
            unit,
            categoryId,
            associationId,
            imageUrl: uploadResponse.secure_url
        });

        return NextResponse.json({
            message: "Product created successfully",
            product: newProduct,
            status: 201
        });

    } catch (error: any) {
        console.error("Error creating product:", error);
        return NextResponse.json({
            message: "An error occurred while creating the product",
            error,
            status: 500
        });
    }
}
