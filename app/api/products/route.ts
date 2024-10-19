import { createProduct, deleteProduct, getAllProducts } from "@/prisma/product";
import { NextResponse } from "next/server";

// POST method
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { image, title, price, category } = body;

        const newProduct = await createProduct(image, title, price, category);
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/products:", error);
        return NextResponse.json({ message: "Error creating product" }, { status: 500 });
    }
}

// GET method
export async function GET() {
    try {
        const products = await getAllProducts();
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching products" }, { status: 500 });
    }
}

// DELETE method
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
        }

        await deleteProduct(id);
        return NextResponse.json({ message: "Product deleted" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error deleting product" }, { status: 500 });
    }
}
