import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;


export async function GET(req: NextRequest) {
  try {
    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    if (!token) {
      return NextResponse.json({ 
        message: "No token found" 
      }, { status: 401 });
    }

    // Verify token
    if (!JWT_SECRET) {
      return NextResponse.json({ 
        message: "Server configuration error" 
      }, { status: 500 });
    }

    const decoded = jwt.verify(token.value, JWT_SECRET as string) as { id: string };
    
    // Get user from database
    const user = await prisma.users.findUnique({
      where: { id: parseInt(decoded.id) },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      }
    });

    if (!user) {
      return NextResponse.json({ 
        message: "User not found" 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      user: user,
      isAdmin: user.role === "ADMIN"
    }, { status: 200 });

  } 
  catch (error) 
  {
    console.error('Verification error:', error);
    return NextResponse.json({ 
      message: "Invalid token" 
    }, { status: 401 });
  }
}
