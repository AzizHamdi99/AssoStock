import { connectDb } from "@/libs/db";
import Category from "@/models/category";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {

    try {
        await connectDb()
        const id = params.id
        const category = await Category.findByIdAndDelete({ _id: id })


        if (!category) {
            return NextResponse.json({ message: "Category not found", status: 404 });
        }

        // Supprimer les produits liés à cette catégorie
        const deletedProducts = await Product.deleteMany({ categoryId: id });

        return NextResponse.json({
            message: "Category and related products deleted successfully",
            deletedProductsCount: deletedProducts.deletedCount,
            status: 200
        });

    } catch (error) {

        return NextResponse.json({
            message: "An error occurred while deleting category",
            error,
            status: 500
        });

    }


}
