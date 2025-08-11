import { connectDb } from "@/libs/db";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
    try {
        await connectDb()
        const email = params.email

    } catch (error) {

    }

}