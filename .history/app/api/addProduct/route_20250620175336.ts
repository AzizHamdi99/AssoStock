import { connectDb } from "@/libs/db";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    try {
        await connectDb()
        const { name, description, price, unit, imageUrl, categoryId, associationEmail } = await req.json()
        if (!name || !description || !price || !unit || !imageUrl || !categoryId || !associationEmail)

    } catch (error) {

    }

}