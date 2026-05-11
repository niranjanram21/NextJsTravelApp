export async function searchFlightsSkyscanner(params) {
  const { location, destination, checkInDate, checkOutDate, adultCount } = params;

  // const url =
  //   `https://${process.env.RAPIDAPI_HOST}/flights/searchFlights?` +
  //   `origin=${location}` +
  //   `&destination=${destination}` +
  //   `&departureDate=${checkInDate}` +
  //   `&returnDate=${checkOutDate}` +
  //   `&adults=${adultCount || 1}`;

  const url =
    `https://${process.env.RAPIDAPI_HOST}/flights/searchFlights?` +
    `originSkyId=DXB&originEntityId=27544008&destinationSkyId=LHR&destinationEntityId=95565050&date=2026-06-10`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Skyscanner error:", error);
    throw new Error("Skyscanner API failed");
  }

  const data = await res.json();

  return data;
}
