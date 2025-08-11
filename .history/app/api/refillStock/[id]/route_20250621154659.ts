import { connectDb } from "@/libs/db";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDb()

        const id = params.id
        const { qt } = await req.json()
        if (!qt || qt < 0) {
            return NextResponse.json({ message: "invalide quantity" }, { status: 404 })

        }
        const product = await Product.findById(id)
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 })
        }


    } catch (error) {

    }

}