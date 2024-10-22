import { registerUser, getUserByEmail } from "@/prisma/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {email, password, name} = body;

        const newUser = await registerUser(email, password, name);
        return NextResponse.json(newUser, {status: 201});
    } catch (error) {
        console.error('Error in Post api/user:', error);
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const user = await getUserByEmail(email);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching user" }, { status: 500 });
    }
}