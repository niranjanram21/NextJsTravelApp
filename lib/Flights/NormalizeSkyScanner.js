export function normalizeSkyscanner(data) {
  if (!data?.itineraries) return [];

  return data.itineraries.map((item) => {
    const leg = item.legs?.[0];

    return {
      provider: "Skyscanner",

      price: item.price?.raw || item.price?.amount || 0,
      currency: item.price?.currency || "INR",

      airline:
        leg?.carriers?.marketing?.[0]?.name ||
        leg?.carriers?.operating?.[0]?.name ||
        "Unknown Airline",

      departure: leg?.departure || null,
      arrival: leg?.arrival || null,

      duration: leg?.durationInMinutes
        ? `${Math.floor(leg.durationInMinutes / 60)}h ${leg.durationInMinutes % 60}m`
        : "N/A",

      stops: leg?.stopCount ?? 0,

      origin: leg?.origin?.displayCode || "",
      destination: leg?.destination?.displayCode || "",

      raw: item, // keep original if needed
    };
  });
}
