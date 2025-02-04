import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"; // bcryptjs for compatibility
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const { email, password }: { email: string; password: string } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        // Ensure JWT secret exists
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            console.error("JWT_SECRET is missing in environment variables.");
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }

        // Find user in database
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email, username: user.username }, // Include username
            secretKey,
            { expiresIn: "2h" } // Extend session duration if needed
        );

        return NextResponse.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
