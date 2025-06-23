import { connectDb } from "@/libs/db";
import Category from "@/models/category";
import { NextRequest } from "next/server";



export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {

    try {
        await connectDb()
        const id = params.id

        const { name, description } = await req.json()

        const upadetdCategory = await Category.findByIdAndUpdate(
            _id: id,
            { name, description }
            , { new: true }
        )

    } catch (error) {

    }


}