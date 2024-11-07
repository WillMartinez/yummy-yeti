"use client";
import { CldImage } from "next-cloudinary";

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  throw new Error(
    "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable is not defined"
  );
}

export { CldImage };
