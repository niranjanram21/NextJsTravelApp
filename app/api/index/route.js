export async function GET(request) {
    return new Response(
        JSON.stringify({ message: "API is working with App Router!" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}
