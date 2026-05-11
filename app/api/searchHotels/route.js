import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { destination, checkInDate, checkOutDate, adults } = await req.json();

    if (!destination) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    const url =
      `https://api.hotels-api.com/v1/hotels/search` +
      `?city=${encodeURIComponent(destination)}` +
      `&checkin=${checkInDate}` +
      `&checkout=${checkOutDate}` +
      `&adults=${adults || 1}` +
      `&limit=20`;

    const response = await fetch(url, {
      headers: {
        "X-API-KEY": process.env.HOTELS_API_KEY || "",
      },
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Hotels-API error:", error);
    return NextResponse.json({ error: "Failed to fetch hotels" }, { status: 500 });
  }
}
