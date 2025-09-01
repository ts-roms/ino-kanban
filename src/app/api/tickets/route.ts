import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  
  await new Promise((resolve) => setTimeout(resolve, 800));

  const filePath = path.join(process.cwd(), "public", "data", "tickets.json");

  try {
    const fileContents = await fs.readFile(filePath, "utf-8");
    const tickets = JSON.parse(fileContents);
    return NextResponse.json(tickets);
  } catch {
    return NextResponse.json(
      { error: "Failed to load tickets.json" },
      { status: 500 }
    );
  }
}
