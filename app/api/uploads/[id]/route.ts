import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, description, category, price } = body;

    if (!title || !description || !category || !price) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        category,
        price: parseFloat(price.toString()),
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Error updating product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (product?.image) {
      // Check if the image is a Cloudinary URL (not base64)
      if (!product.image.startsWith('data:image')) {
        try {
          // Extract public ID from Cloudinary URL
          // Example URL: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/image_name.jpg
          const urlParts = product.image.split('/');
          const uploadIndex = urlParts.findIndex(part => part === 'upload');
          if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
            // Get everything after 'upload' and before the file extension
            const pathAfterUpload = urlParts.slice(uploadIndex + 2).join('/');
            const publicId = pathAfterUpload.split('.')[0]; // Remove file extension
            
            await cloudinary.uploader.destroy(publicId, {
              resource_type: "image",
            });
          }
        } catch (cloudinaryError) {
          console.error("Error deleting from Cloudinary:", cloudinaryError);
          // Continue with database deletion even if Cloudinary deletion fails
        }
      }
    }
    
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Error deleting product" },
      { status: 500 }
    );
  }
}
