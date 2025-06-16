import { connectDb } from "@/libs/db";
import Association from "@/models/assosiation";
import Category from "@/models/category";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
    try {
        await connectDb()
        const email = params.email

        const association = await Association.findOne({ email })
        if (!association) {
            return NextResponse.json({ message: "user not found", status: 404 })
        }

        const newCategory = await Category.find({ associationId: association?._id })
        return NextResponse.json('')

    } catch (error) {

    }

}