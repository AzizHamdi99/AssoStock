import { connectDb } from "@/libs/db";
import Association from "@/models/assosiation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb();

        const { name, email } = await req.json();

        if (!name || !email) {
            return NextResponse.json({ message: "Missing information" }, { status: 400 });
        }

        const user = await Association.findOne({ email });

        if (user) {
            return NextResponse.json(user, { status: 200 });
        }

        const newUser = await Association.create({ name, email });

        return NextResponse.json(
            { message: "Association created", data: newUser },
            { status: 201 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Server error", error },
            { status: 500 }
        );
    }
}
