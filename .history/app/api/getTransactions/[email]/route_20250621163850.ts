import { connectDb } from "@/libs/db";
import Transaction from "@/models/transaction";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
    try {
        await connectDb();

        const email = params.email;

        if (!email) {
            return NextResponse.json({ message: "Missing email parameter" }, { status: 400 });
        }
        const transactions = await Transaction.find({ associationEmail: email }).sort({ createdAt: -1 });


        if (transactions.length === 0) {
            return NextResponse.json({ message: "No transactions found" }, { status: 404 });
        }

        return NextResponse.json(transactions, { status: 200 });

    } catch (error) {
        console.error("Error fetching transactions:", error);
        return NextResponse.json({ message: "Server error", error }, { status: 500 });
    }
}
