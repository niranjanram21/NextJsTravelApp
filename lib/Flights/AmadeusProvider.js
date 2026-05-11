import { NextResponse } from "next/server";
import amadeus from "@/lib/amadeus";

export async function searchFlightsAmadeus(params) {
  const {
    location,
    destination,
    adultCount,
    childCount,
    infantCount,
    travelClass,
    checkInDate,
    checkOutDate,
  } = params;

  const response = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: location,
    destinationLocationCode: destination,
    departureDate: checkInDate,
    returnDate: checkOutDate,
    adults: adultCount,
    children: childCount,
    infants: infantCount,
    travelClass,
  });

  return response.data;
}
