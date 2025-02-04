"use server";
import fs from "fs";
import path from "path";

export async function fetchImages() {
  try {
    const imagesDir = path.join(process.cwd(), "public/assets/images/house");
    const files = fs
      .readdirSync(imagesDir)
      .map((file) => `/assets/images/house/${file}`);
    return { status: "success", files };
  } catch (e) {
    return { status: "error", e };
  }
}
