import { connectDb } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDb()

        const id = params.id
        const { qt } = await req.json()
        if (!qt) {
            return NextResponse.json({ message: "invalide quantity" }, { status: 404 })

        }
        if
    } catch (error) {

    }

}