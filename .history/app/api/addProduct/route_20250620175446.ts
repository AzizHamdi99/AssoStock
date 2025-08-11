import { connectDb } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        await connectDb()
        const { name, description, price, unit, imageUrl, categoryId, associationEmail } = await req.json()
        if (!name || !description || !price || !unit || !imageUrl || !categoryId || !associationEmail) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 })
        }

    } catch (error) {

    }

}