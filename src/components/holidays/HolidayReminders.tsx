import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { subscribeToNewsletter } from "@/lib/newsletter-server";
import { SPECIAL_HOLIDAYS_PATH, type HolidayCampaign } from "@/lib/holidays";

const PAGE_URL = `https://amaresbigplanet.com${SPECIAL_HOLIDAYS_PATH}`;
const EVENT_MINUTES = 30;

const smallButton =
  "holiday-btn inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-[var(--h-ink)] ring-2 ring-[var(--h-secondary-soft)] hover:bg-[var(--h-secondary-soft)] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[var(--h-secondary)]";

function eventTitle(campaign: HolidayCampaign) {
  return `Amare's Big Planet: ${campaign.videoTitle}`;
}

/** 20261224T150000Z — the UTC format both Google Calendar and .ics files expect. */
function toCalendarStamp(ms: number) {
  return new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function googleCalendarUrl(campaign: HolidayCampaign, start: number) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: eventTitle(campaign),
    dates: `${toCalendarStamp(start)}/${toCalendarStamp(start + EVENT_MINUTES * 60_000)}`,
    details: `${campaign.description}\n\nWatch here: ${PAGE_URL}`,
    location: PAGE_URL,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcs(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function downloadIcs(campaign: HolidayCampaign, start: number) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Amare's Big Planet//Special Holidays//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${campaign.slug}@amaresbigplanet.com`,
    `DTSTAMP:${toCalendarStamp(Date.now())}`,
    `DTSTART:${toCalendarStamp(start)}`,
    `DTEND:${toCalendarStamp(start + EVENT_MINUTES * 60_000)}`,
    `SUMMARY:${escapeIcs(eventTitle(campaign))}`,
    `DESCRIPTION:${escapeIcs(`${campaign.description}\n\nWatch here: ${PAGE_URL}`)}`,
    `URL:${PAGE_URL}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcs(eventTitle(campaign))} starts in 15 minutes`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${campaign.slug}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** "Add to calendar" buttons for the premiere (Google Calendar link + .ics for Apple/Outlook). */
export function HolidayCalendarButtons({
  campaign,
  releaseTime,
}: {
  campaign: HolidayCampaign;
  releaseTime: number;
}) {
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-2">
      <a
        href={googleCalendarUrl(campaign, releaseTime)}
        target="_blank"
        rel="noopener noreferrer"
        className={smallButton}
      >
        <span aria-hidden="true">📅</span> Google Calendar
        <span className="sr-only">(opens in a new tab)</span>
      </a>
      <button type="button" onClick={() => downloadIcs(campaign, releaseTime)} className={smallButton}>
        <span aria-hidden="true">📅</span> Apple / Outlook
      </button>
    </div>
  );
}

function shortReleaseDate(campaign: HolidayCampaign, releaseTime: number) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      timeZone: campaign.releaseTimeZone,
    }).format(new Date(releaseTime));
  } catch {
    return null;
  }
}

/** Opens WhatsApp with a ready-made message about the countdown (or the released video). */
export function HolidayWhatsAppShare({
  campaign,
  releaseTime,
  released,
  className,
}: {
  campaign: HolidayCampaign;
  releaseTime: number | null;
  released: boolean;
  className: string;
}) {
  const emoji = campaign.theme.emoji;
  const date = releaseTime !== null ? shortReleaseDate(campaign, releaseTime) : null;
  const text = released
    ? `${emoji} Amare's ${campaign.videoTitle} is out! Watch it here: ${PAGE_URL}`
    : `${emoji} Amare's Big Planet ${campaign.videoTitle} premieres${date ? ` ${date}` : " soon"}! Join the countdown: ${PAGE_URL}`;

  return (
    <a
      href={`https://wa.me/?text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <span aria-hidden="true">📲</span> Share on WhatsApp
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

/** Email signup that joins the same Zoho Campaigns list as the homepage newsletter. */
export function HolidayEmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await subscribeToNewsletter({ data: { email: value } });
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <p className="mt-5 rounded-2xl bg-[var(--h-secondary-soft)] px-4 py-3 text-sm font-bold" role="status">
        <span aria-hidden="true">🎉 </span>You're on the list! We'll send you holiday updates.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 border-t border-[var(--h-secondary-soft)] pt-4" noValidate>
      <label htmlFor="holiday-email" className="block text-sm font-bold">
        <span aria-hidden="true">✉️ </span>Get holiday updates by email
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          id="holiday-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Parent's email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "holiday-email-error" : undefined}
          className="min-h-11 flex-1 rounded-full border-2 border-[var(--h-secondary-soft)] bg-white px-4 text-base outline-none focus:border-[var(--h-secondary)]"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="holiday-btn min-h-11 rounded-full bg-[var(--h-secondary)] px-5 text-sm font-extrabold text-white hover:brightness-110 disabled:opacity-60"
        >
          {status === "sending" ? "Signing up…" : "Sign me up"}
        </button>
      </div>
      {status === "error" && (
        <p id="holiday-email-error" className="mt-2 text-sm font-bold text-[var(--h-accent-strong)]" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

function timeZoneOffsetMinutes(timeZone: string, at: number) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(new Date(at));
  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  return Math.round((asUtc - Math.floor(at / 60_000) * 60_000) / 60_000);
}

/**
 * "That's 4:00 PM where you are (Thu, Dec 24)" — only for visitors whose time zone
 * differs from the campaign's. Computed after load so server and browser HTML match.
 */
export function HolidayLocalReleaseTime({
  campaign,
  releaseTime,
}: {
  campaign: HolidayCampaign;
  releaseTime: number;
}) {
  const [localLabel, setLocalLabel] = useState<string | null>(null);

  useEffect(() => {
    try {
      const visitorZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (
        !visitorZone ||
        timeZoneOffsetMinutes(visitorZone, releaseTime) ===
          timeZoneOffsetMinutes(campaign.releaseTimeZone, releaseTime)
      ) {
        return;
      }
      const date = new Date(releaseTime);
      const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(date);
      const day = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(date);
      setLocalLabel(`${time}|${day}`);
    } catch {
      /* unknown time zone: just show the EAT time */
    }
  }, [campaign.releaseTimeZone, releaseTime]);

  if (!localLabel) return null;
  const [time, day] = localLabel.split("|");
  return (
    <p className="mt-1 text-sm font-medium text-[var(--h-ink)]/75">
      <span aria-hidden="true">🕕 </span>
      That's <strong>{time}</strong> where you are ({day})
    </p>
  );
}

/** Adds UTM tags so Shopify can report visits and sales from this page. */
export function withShopTracking(url: string, campaign: HolidayCampaign) {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("utm_source", "amaresbigplanet");
    parsed.searchParams.set("utm_medium", "special-holidays");
    parsed.searchParams.set("utm_campaign", campaign.slug);
    return parsed.toString();
  } catch {
    return url;
  }
}
