import { connectDb } from "@/libs/db";
import Product from "@/models/product";
import Transaction from "@/models/transaction";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDb()

        const id = params.id
        const { qt, type, associationId } = await req.json()
        if (!type || !associationId) {
            return NextResponse.json({ message: "Messing fields" }, { status: 404 })

        }
        if (!qt || qt < 0) {
            return NextResponse.json({ message: "invalide quantity" }, { status: 404 })

        }
        const product = await Product.findById(id)
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 })
        }
        product.quantity = (product.quantity || 0) + qt
        await product.save()

        const newTransaction = await Transaction.create({


        })
        return NextResponse.json({ message: "Stock updated" }, { status: 200 })


    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 })

    }

}