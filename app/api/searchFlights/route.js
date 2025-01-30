import { NextResponse } from "next/server";
import amadeus from "@/lib/amadeus";

export async function POST(req) {
    try {
        const { destination, passengers, checkInDate } = await req.json();

        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: "LAX",
            destinationLocationCode: destination,
            departureDate: checkInDate,
            adults: passengers,
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error fetching flights:", error);
        return NextResponse.json(
            { error: "Failed to fetch flight results. Please try again." },
            { status: 500 }
        );
    }
}
