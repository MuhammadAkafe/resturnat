import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" }, 
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

    // Find user
    const user = await prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        role: true,
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" }, 
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" }, 
        { status: 401 }
      );
    }

    // Check for JWT secret
    if (!JWT_SECRET) {
      return NextResponse.json(
        { message: "Server configuration error" }, 
        { status: 500 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id }, 
      JWT_SECRET as string, 
      { expiresIn: '30d' }
    );
    
    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;
    
    // Create response
    const response = NextResponse.json({ 
      message: "Login successful", 
      user: userWithoutPassword,
      isAdmin: user.role === "ADMIN"
    });
    
    // Set token in cookies
    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    
    return response;
    
  } catch (error) {
    console.error("Login error:", error);
    
    // Provide more specific error messages for debugging
    if (error instanceof Error) {
      if (error.message.includes('connect')) {
        return NextResponse.json(
          { message: "Database connection error. Please try again." }, 
          { status: 500 }
        );
      }
      if (error.message.includes('bcrypt')) {
        return NextResponse.json(
          { message: "Password verification error. Please try again." }, 
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { message: "Internal server error. Please try again." }, 
      { status: 500 }
    );
  }
}
