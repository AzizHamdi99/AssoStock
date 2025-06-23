import { connectDb } from "@/libs/db";
import Transaction from "@/models/transaction";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { email: string } }) {

    try {
        await connectDb()
        const email = params.email

        const transactions = await Transaction.find({ associationEmail: email })
        if (!transactions) {
            return NextResponse.json({ message: "transactions not found" }, { status: 404 })

        }

        return NextResponse.json(transactions, { status: 200 })
    } catch (error) {

    }

}
