import { connectDb } from "@/libs/db";


export async function DELETE({ params }: { params: { id: string } }) {

    try {
        await connectDb()
        const id = params.id

    } catch (error) {

    }

}