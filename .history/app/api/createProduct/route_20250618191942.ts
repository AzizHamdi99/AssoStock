import { connectDb } from "@/libs/db";
import { NextRequest } from "next/server";



export async function POST(req: NextRequest) {
    try {
        await connectDb()


    } catch (error) {

    }

}