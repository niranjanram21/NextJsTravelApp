import { NextResponse } from "next/server";
import amadeus from "@/lib/amadeus";

export async function POST(req) {
    try {
        const { location, destination, adultCount, childCount, infantCount, travelClass, checkInDate, checkOutDate } = await req.json();

        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: location,
            destinationLocationCode: destination,
            departureDate: checkInDate,
            returnDate: checkOutDate,
            adults: adultCount,
            children: childCount,
            infants: infantCount,
            travelClass: travelClass,
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
