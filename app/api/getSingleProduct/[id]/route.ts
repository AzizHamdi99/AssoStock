import { connectDb } from "@/libs/db";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDb()
        const id = params.id
        const product = await Product.findById(id)

        if (!product) {
            return NextResponse.json({ message: "Pproduct not found" }, { status: 404 })
        }

        return NextResponse.json(product, { status: 200 })
    } catch (error) {

        console.log(error)
        return NextResponse.json(
            { message: "Server error", error },
            { status: 500 }
        );

    }

}