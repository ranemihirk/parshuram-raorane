import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), "public/assets/images/house");
    const files = fs.readdirSync(imagesDir).map((file) => `/assets/images/house/${file}`);

    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load images" }, { status: 500 });
  }
}
