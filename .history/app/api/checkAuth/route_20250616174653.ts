import { connectDb } from "@/libs/db";
import Association from "@/models/assosiation";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        await connectDb()
        const { name, email } = await req.json()
        if (!name || !email) {
            return NextResponse.json({ message: "Missing information" })
        }
        const user = await Association.findOne({ email })
        if (user) {
            return NextResponse.json(user)
        }
        const newUser = await Association.create({
            name,
            email
        })

        if (newUser) {
            return NextResponse.json(newUser, { message: "Assosiation created " })

        }

    } catch (error) {

    }




}