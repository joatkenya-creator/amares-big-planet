import { createServerFn } from "@tanstack/react-start";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZOHO_OPTIN_URL = "https://zgnp-zngp.maillist-manage.com/weboptin.zc";

// Fixed tokens copied from the Zoho Campaigns "Join Our Newsletter" embed form.
// These identify the target list/form; they are not secrets.
const ZOHO_FORM_FIELDS = {
  submitType: "optinCustomView",
  emailReportId: "",
  formType: "QuickForm",
  zx: "13730de03",
  zcvers: "3.0",
  oldListIds: "",
  mode: "OptinCreateView",
  zcld: "117654cbaa2dba04b",
  zctd: "117654cbaa2db9f71",
  document_domain: "",
  zc_Url: "zgnp-zngp.maillist-manage.com",
  new_optin_response_in: "0",
  duplicate_optin_response_in: "0",
  zc_trackCode: "ZCFORMVIEW",
  zc_formIx:
    "3zad9daa16fb4cc7a5992e82f6f22a32d50d8311d08b0b0653cd59aec2b4af76b2",
  viewFrom: "URL_ACTION",
  scriptless: "yes",
};

export const subscribeToNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const email = data.email.trim().toLowerCase();
    if (!EMAIL_RE.test(email)) {
      throw new Error("A valid email address is required");
    }

    const body = new URLSearchParams({
      CONTACT_EMAIL: email,
      LASTNAME: "",
      ...ZOHO_FORM_FIELDS,
    });

    const res = await fetch(ZOHO_OPTIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!res.ok) {
      console.error("Zoho Campaigns signup error:", res.status, await res.text());
      throw new Error("Could not save your email. Please try again.");
    }

    return { ok: true };
  });
