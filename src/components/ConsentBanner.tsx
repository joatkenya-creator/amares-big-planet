import { useEffect, useState } from "react";
import { CONSENT_CHANGED, getConsent, setConsent } from "@/lib/referral";

/** Accept / Reject cookie banner, written for parents. Nothing optional runs until Accept. */
export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setOpen(getConsent() === null);
    sync();
    window.addEventListener(CONSENT_CHANGED, sync);
    return () => window.removeEventListener(CONSENT_CHANGED, sync);
  }, []);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-[3000] border-t-4 border-[#2a2a6e] bg-white px-4 py-4 text-[#2a2a6e] shadow-lg sm:px-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p id="consent-title" className="text-sm">
          <strong>For grown-ups:</strong> we'd like to use cookies for site analytics, and to credit
          the ambassador who recommended Amare's Big Planet if you visit our shop. Nothing optional
          runs unless you accept.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => void setConsent("rejected")}
            className="rounded-full border-2 border-[#2a2a6e] px-4 py-2 text-sm font-semibold"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => void setConsent("accepted")}
            className="rounded-full bg-[#2a2a6e] px-4 py-2 text-sm font-semibold text-white"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
