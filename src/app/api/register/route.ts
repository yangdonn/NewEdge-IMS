import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Define schema with `.strict()` to avoid extra fields
const userSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        username: z.string().min(1, "Username is required"), // Add username to schema
        password: z.string().min(6, "Password must be at least 6 characters long"),
    })
    .strict();

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input
        const validationResult = userSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                { message: "Validation failed", errors: validationResult.error.errors },
                { status: 400 }
            );
        }

        const { name, email, username, password } = validationResult.data; // Use validated data

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 } // 409 Conflict instead of 400
            );
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                username,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            {
                message: "User registered successfully",
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    username: newUser.username,
                }, // Exclude password for security
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Registration error:", error);

        // Avoid exposing sensitive error details in production
        return NextResponse.json(
            {
                message: "Something went wrong. Please try again later.",
                error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
            },
            { status: 500 }
        );
    }
}