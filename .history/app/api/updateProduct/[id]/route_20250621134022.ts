import { connectDb } from "@/libs/db";
import Product from "@/models/product";
import { NextRequest } from "next/server";



export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDb()
        const id = params.id
        const { name, description, price, unit }

        const product = await Product
    } catch (error) {

    }
}