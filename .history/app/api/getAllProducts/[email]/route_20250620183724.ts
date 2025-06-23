import { connectDb } from "@/libs/db";
import Product from "@/models/product";
import next from "next";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
    try {
        await connectDb()

        const email = params.email

        if (!email) {
            return NextResponse.json({ message: "email not found" }, { status: 404 })

        }
        const products = await Product.find({ associationEmail: email })

        return NextResponse.json({ products }, { status: 200 });
    } catch (error) {

    }

}