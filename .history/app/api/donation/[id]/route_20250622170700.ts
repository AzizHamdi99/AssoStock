import { connectDb } from "@/libs/db";
import Product from "@/models/product";
import Transaction from "@/models/transaction";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDb();
        const id = params.id;
        const { quantity, type, associationEmail } = await req.json();

        if (!type || !associationEmail) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        if (quantity === undefined || quantity < 0) {
            return NextResponse.json({ message: "Invalid quantity" }, { status: 400 });
        }

        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        if (product.quantity >= quantity) {
            product.quantity -= quantity;
            await product.save();

            const newTransaction = await Transaction.create({
                type,
                quantity,
                productId: id,
                associationEmail
            });

            return NextResponse.json({
                message: "Stock updated successfully.",
                product,
                transaction: newTransaction
            }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Not enough stock available." }, { status: 400 });
        }
    } catch (error) {
        console.error("PUT /api/product/[id] error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
