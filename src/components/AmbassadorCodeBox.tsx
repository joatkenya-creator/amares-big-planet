import { useEffect, useId, useState } from "react";
import {
  CODE_CHANGED,
  applyCode,
  getAppliedCode,
  removeCode,
  type AppliedCode,
} from "@/lib/referral";

/**
 * "Have an ambassador code?" — a visitor types a JOAT Global ambassador's code
 * so purchases in the shop are credited to them. Not a discount code.
 * `tone` matches the surface it sits on (dark footer, light popup).
 */
export function AmbassadorCodeBox({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [applied, setApplied] = useState<AppliedCode | null>(null);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputId = useId();

  useEffect(() => {
    const sync = () => setApplied(getAppliedCode());
    sync();
    window.addEventListener(CODE_CHANGED, sync);
    return () => window.removeEventListener(CODE_CHANGED, sync);
  }, []);

  const muted = tone === "dark" ? "rgba(255,255,255,0.85)" : "#555";
  const text = tone === "dark" ? "#fff" : "#1a1a2e";

  if (applied)
    return (
      <p className="text-sm" style={{ color: text }} aria-live="polite">
        Referred by {applied.name} ✓{" "}
        <button type="button" onClick={removeCode} className="underline" style={{ color: muted }}>
          Remove
        </button>
      </p>
    );

  if (!open)
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm underline"
        style={{ color: muted }}
      >
        Have an ambassador code?
      </button>
    );

  return (
    <form
      className="flex flex-col gap-1.5"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        const result = await applyCode(code);
        setBusy(false);
        if (!result) setError("We couldn't find that code");
      }}
    >
      <label htmlFor={inputId} className="text-xs font-semibold" style={{ color: text }}>
        Ambassador code
      </label>
      <div className="flex gap-2">
        <input
          id={inputId}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={12}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="e.g. 98NXCR22"
          className="w-36 rounded-full border border-gray-300 bg-white px-3 py-1.5 font-mono text-sm uppercase text-[#1a1a2e]"
          required
        />
        <button
          type="submit"
          disabled={busy || !code.trim()}
          className="rounded-full bg-[var(--sunshine)] px-4 py-1.5 text-sm font-bold text-[#1a1a2e] disabled:opacity-60"
        >
          {busy ? "Checking…" : "Apply"}
        </button>
      </div>
      <p className="text-xs" style={{ color: muted }} aria-live="polite">
        {error ||
          "Credits a JOAT Global ambassador for your shop order. It doesn't change the price."}
      </p>
    </form>
  );
}
