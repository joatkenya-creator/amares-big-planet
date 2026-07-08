import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/mpesa-callback")({
  POST: async ({ request }) => {
    const body = await request.json();
    console.log("M-Pesa Callback:", JSON.stringify(body, null, 2));

    // body.Body.stkCallback.ResultCode === 0 means payment succeeded
    // You can store results in Cloudflare D1/KV if you want to track payments

    return new Response(
      JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }),
      { headers: { "Content-Type": "application/json" } },
    );
  },
});
