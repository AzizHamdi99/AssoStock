import { connectDb } from "@/libs/db";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDb()
        const id = params.id

        const { name, description, price, unit, imageUrl, categoryId, associationEmail } = await req.json();

        if (!name || !description || !price || !unit || !imageUrl || !categoryId || !associationEmail) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        const product = await Product
    } catch (error) {

    }
}