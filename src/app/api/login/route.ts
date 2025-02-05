import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => null);
        if (!body) {
            return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
        }

        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
        }

        // Find user in the database by username
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // Get JWT secret
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            console.error("JWT_SECRET is missing!");
            return NextResponse.json({ message: "Server error" }, { status: 500 });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            secretKey,
            { expiresIn: "1h" }
        );

        return NextResponse.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
