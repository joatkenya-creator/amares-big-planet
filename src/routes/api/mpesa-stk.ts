import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getMpesaToken, stkPush } from "../../lib/mpesa";

export const APIRoute = createAPIFileRoute("/api/mpesa-stk")({
  POST: async ({ request }) => {
    const body = (await request.json()) as {
      phoneNumber: string;
      amount: number;
    };

    if (!body.phoneNumber || !body.amount || body.amount < 1) {
      return new Response(
        JSON.stringify({ error: "Phone number and amount are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const passkey = process.env.MPESA_PASSKEY;
    const env = process.env.MPESA_ENV || "sandbox";
    const shortcode = process.env.MPESA_SHORTCODE || "542542";

    if (!consumerKey || !consumerSecret || !passkey) {
      return new Response(
        JSON.stringify({ error: "M-Pesa credentials not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    try {
      const token = await getMpesaToken(consumerKey, consumerSecret, env);

      // Use the request URL to build the callback URL dynamically
      const url = new URL(request.url);
      const callbackUrl = `${url.origin}/api/mpesa-callback`;

      const result = await stkPush({
        token,
        passkey,
        shortcode,
        phoneNumber: body.phoneNumber,
        amount: body.amount,
        callbackUrl,
        env,
      });

      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("M-Pesa STK Push error:", err);
      return new Response(
        JSON.stringify({ error: "Payment initiation failed" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
});
