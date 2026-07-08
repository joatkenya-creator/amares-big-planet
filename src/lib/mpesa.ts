const SANDBOX_URL = "https://sandbox.safaricom.co.ke";
const PRODUCTION_URL = "https://api.safaricom.co.ke";

const PAYBILL = "542542";
const ACCOUNT_NUMBER = "120129";

function getBaseUrl(env: string) {
  return env === "production" ? PRODUCTION_URL : SANDBOX_URL;
}

export async function getMpesaToken(
  consumerKey: string,
  consumerSecret: string,
  env: string,
): Promise<string> {
  const auth = btoa(`${consumerKey}:${consumerSecret}`);
  const baseUrl = getBaseUrl(env);

  const res = await fetch(
    `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: { Authorization: `Basic ${auth}` },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to get M-Pesa token: ${res.status}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function stkPush(params: {
  token: string;
  passkey: string;
  phoneNumber: string;
  amount: number;
  callbackUrl: string;
  env: string;
}) {
  const baseUrl = getBaseUrl(params.env);

  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .slice(0, 14);

  const password = btoa(`${PAYBILL}${params.passkey}${timestamp}`);

  // Format phone: 0712345678 -> 254712345678
  let phone = params.phoneNumber.replace(/\s+/g, "");
  if (phone.startsWith("0")) {
    phone = "254" + phone.slice(1);
  } else if (phone.startsWith("+")) {
    phone = phone.slice(1);
  }

  const body = {
    BusinessShortCode: PAYBILL,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: params.amount,
    PartyA: phone,
    PartyB: PAYBILL,
    PhoneNumber: phone,
    CallBackURL: params.callbackUrl,
    AccountReference: ACCOUNT_NUMBER,
    TransactionDesc: "Support Amares Big Planet",
  };

  const res = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
}
