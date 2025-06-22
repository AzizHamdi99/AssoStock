import { connectDb } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {

    try {
        await connectDb()
        const id = params.id
        const { quantity, type, associationEmail } = await req.json()
        if (!type || !associationEmail) {
            return NextResponse.json({ message: "Missing fields" }, { status: 404 })

        }
        if (!quantity || quantity < 0) {
            return NextResponse.json({ message: "invalide quantity" }, { status: 404 })

        }
    } catch (error) {

    }

}