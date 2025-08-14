import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/app/lib/prisma";

// Configure Cloudinary only if environment variables are available
if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const price = formData.get("price") as string;
    const imageFile = formData.get("image") as File;

    if (!title || !description || !category || !price || !imageFile) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${imageFile.type};base64,${buffer.toString(
      "base64"
    )}`;

    let imageUrl = base64Image; // Default to base64 if Cloudinary not configured

    // Try to upload to Cloudinary if configured
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      try {
        const cloudinaryResult = await cloudinary.uploader.upload(base64Image, {
          resource_type: "image",
          public_id: `${title}-${Date.now()}`,
          folder: "products",
          overwrite: true,
          transformation: [{ width: 1000, height: 1000, crop: "limit" }],
        });
        imageUrl = cloudinaryResult.secure_url;
      } catch (cloudinaryError) {
        console.error(
          "Cloudinary upload failed, using base64:",
          cloudinaryError
        );
      }
    }

    // Save to database
    const product = await prisma.product.create({
      data: {
        title,
        description,
        category,
        price: parseFloat(price),
        image: imageUrl,
      },
    });


    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
      },
      { status: 201 }
    );
  }
   catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Fetch all products from database with optimized query
    const products = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        price: true,
        image: true,
      },
      orderBy: {
        id: "desc", // Show newest products first
      },
    });

    // Create response with proper caching headers
    const response = NextResponse.json(products);
    return response;
  } 
  catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}
