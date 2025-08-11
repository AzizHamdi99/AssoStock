import { connectDb } from "@/libs/db";
import Category from "@/models/category";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {

    try {
        await connectDb()
        const id = params.id

        const { name, description } = await req.json()

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, description }
            , { new: true }
        )

        if (!updatedCategory) {
            return NextResponse.json({ message: "Category not found", status: 404 });
        }
        return NextResponse.json({ message: "Category updated", status: 200, category: updatedCategory });

    } catch (error) {
        return NextResponse.json({ message: "Error updating category", error, status: 500 });

    }


}