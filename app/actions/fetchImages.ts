"use server";
import fs from "fs";
import path from "path";

export async function fetchImages() {
  const imagesDir = path.join(process.cwd(), "public/assets/images/house");
  const files = fs
    .readdirSync(imagesDir)
    .map((file) => `/assets/images/house/${file}`);
  return files;
}
