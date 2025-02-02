import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const imagesDir = path.join(process.cwd(), "public/assets/images/house");
  const files = fs.readdirSync(imagesDir).map((file) => `/assets/images/house/${file}`);

  return NextResponse.json(files);
}
