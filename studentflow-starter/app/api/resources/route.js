import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Fetch articles or return fallback resource array as JSON
  return NextResponse.json({ resources: [] });
}
