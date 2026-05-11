// import { NextResponse } from "next/server";
// import { searchFlightsAmadeus } from "@/lib/Flights/AmadeusProvider";
// import { searchFlightsSkyscanner } from "@/lib/Flights/SkyscannerProvider";

// export async function POST(req) {
//   try {
//     const params = await req.json();

//     const [amadeusRes, skyRes] = await Promise.allSettled([
//       searchFlightsAmadeus(params),
//       searchFlightsSkyscanner(params),
//     ]);

//     console.log("Amadeus Result:", amadeusRes);
//     console.log("Skyscanner Result:", skyRes);

//     let results = [];

//     if (amadeusRes.status === "fulfilled") {
//       results.push(...amadeusRes.value);
//     }

//     if (skyRes.status === "fulfilled") {
//       results.push(...skyRes.value);
//     }

//     if (amadeusRes.status === "rejected") {
//       console.error("Amadeus Error:", amadeusRes.reason);
//     }

//     if (skyRes.status === "rejected") {
//       console.error("Skyscanner Error:", skyRes.reason);
//     }

//     if (results.length === 0) {
//       throw new Error("All providers failed");
//     }

//     return NextResponse.json(results);
//   } catch (error) {
//     console.error("ERROR:", error);

//     return NextResponse.json(
//       {
//         message: "Failed to fetch flights",
//         error: error.message,
//         stack: error.stack,
//       },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { searchFlightsSkyscanner } from "@/lib/Flights/SkyscannerProvider";
import { normalizeSkyscanner } from "@/lib/Flights/NormalizeSkyScanner";

export async function POST(req) {
  try {
    const params = await req.json();

    const [skyRes] = await Promise.allSettled([searchFlightsSkyscanner(params)]);

    console.log("Skyscanner Result:", skyRes);

    let results = [];

    if (skyRes.status === "fulfilled") {
      const cleanData = normalizeSkyscanner(skyRes.value);
      results.push(...cleanData);
    }

    if (skyRes.status === "rejected") {
      console.error("Skyscanner Error:", skyRes.reason);
    }

    if (results.length === 0) {
      throw new Error("Skyscanner failed");
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch flights",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
