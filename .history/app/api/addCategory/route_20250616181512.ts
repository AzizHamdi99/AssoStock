import { connectDb } from "@/libs/db";
import Association from "@/models/assosiation";
import Category from "@/models/category";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {

    try {
        await connectDb()

        const { name, descreption, email } = await req.json()

        if (!name || !descreption || !email) {
            return NextResponse.json({ message: "Missing fields", status: 404 })
        }
        const user = await Association.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: "User not found", status: 404 })

        }
        const newCategory = await Category.create({
            name,
            descreption,
            associationId: user?._id
        })
        return NextResponse.json(
            { message: "Category Created ", data: newCategory },
            { status: 201 }
        );


    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Server error", error },
            { status: 500 }
        );

    }

}