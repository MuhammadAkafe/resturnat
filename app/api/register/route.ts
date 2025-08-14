import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, role } = await req.json();
    
    // Validate required fields
    if (!username || !email || !password || !role) {
      return NextResponse.json(
        { message: "All fields are required" }, 
        { status: 400 }
      );
    }
    
    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" }, 
        { status: 400 }
      );
    }
    
    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address" }, 
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" }, 
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role
      }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(
      { 
        message: "User created successfully", 
        user: userWithoutPassword 
      }, 
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" }, 
      { status: 500 }
    );
  }
}
