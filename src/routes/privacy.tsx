import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { resetConsent } from "@/lib/referral";

const CONTACT = "partnership@amaresbigplanet.com";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy | Amare's Big Planet" },
      {
        name: "description",
        content:
          "How Amare's Big Planet handles information on amaresbigplanet.com: cookies, analytics, ambassador referrals, the newsletter, donations and the shop.",
      },
      { property: "og:url", content: "https://amaresbigplanet.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://amaresbigplanet.com/privacy" }],
  }),
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-2xl font-bold text-[#1a1a2e]">{title}</h2>
      <div className="space-y-3 leading-relaxed text-[#333]">{children}</div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-3xl space-y-10 px-4 pb-20 pt-28 sm:px-6">
        <header className="space-y-2">
          <h1 className="font-display text-4xl font-bold text-[#1a1a2e]">Privacy Policy</h1>
          <p className="text-sm text-[#666]">Last updated 24 November 2026</p>
          <p className="leading-relaxed text-[#333]">
            Amare's Big Planet makes songs, videos and games for young children. This page explains
            what information amaresbigplanet.com handles and why. We keep it to the minimum the site
            needs. Questions or requests:{" "}
            <a className="underline" href={`mailto:${CONTACT}`}>
              {CONTACT}
            </a>
            .
          </p>
        </header>

        <Section title="Children">
          <p>
            Our videos and games are for children, but this website is meant to be used by parents,
            caregivers and teachers. Children don't need to give us any information to watch or
            play, and we don't knowingly collect personal information from children under 13.
          </p>
          <p>
            The forms on this site (newsletter, donations, ambassador code) and the cookie choice
            are for grown-ups. If you think a child has sent us personal information, email us and
            we will delete it.
          </p>
        </Section>

        <Section title="Cookies and your choice">
          <p>
            When you first visit, we ask whether you accept cookies. Your answer is saved in your
            browser so we don't ask on every page. Until you accept, no analytics or referral
            cookies are set.
          </p>
          <p>
            <button type="button" onClick={resetConsent} className="font-semibold underline">
              Change your cookie choice
            </button>
          </p>
        </Section>

        <Section title="Analytics (only if you accept)">
          <p>
            If you accept cookies, we use Google Analytics and Microsoft Clarity to understand which
            pages and videos are useful and where the site is hard to use. They record things like
            the pages visited, the device and browser type, and approximate location. We don't send
            them your name or email address.
          </p>
        </Section>

        <Section title="Ambassador referrals">
          <p>
            Some visitors arrive through a link shared by a JOAT Global ambassador, who may earn a
            commission on shop purchases. When that happens we count the visit. The count stores the
            page you landed on and a scrambled code made from your internet address, which changes
            every day, so we can spot repeated or automated clicks without being able to identify
            you.
          </p>
          <p>
            If you've accepted cookies, a referral cookie is kept for 30 days so a later purchase
            can be credited. If you type an ambassador's code yourself, it is kept only until you
            close the browser tab (or in the 30-day cookie if you've accepted cookies). The referral
            holds a visit number and an expiry date, nothing personal, and is passed to the shop so
            the purchase can be credited. Entering a code doesn't change the price.
          </p>
        </Section>

        <Section title="Newsletter">
          <p>
            If you sign up for our newsletter, your email address is sent to Zoho Campaigns, which
            sends the newsletter for us. Every email has an unsubscribe link.
          </p>
        </Section>

        <Section title="Donations">
          <p>
            Donations are handled by Paystack. Your card, bank or M-Pesa details go straight to
            Paystack; we never see or store them. To show amounts in your currency, the donation
            page fetches exchange rates from open.er-api.com, which doesn't receive any details
            about you.
          </p>
        </Section>

        <Section title="The shop, videos and the app">
          <p>
            Our shop runs on Shopify, and Shopify's privacy policy applies to purchases there.
            Videos are hosted on YouTube, whose privacy policy applies when you play them. Our ABCs
            app has its own privacy information on its App Store and Google Play pages.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            You can ask us what information we hold about you, ask us to correct or delete it, or
            withdraw your cookie consent at any time using the button above. Email{" "}
            <a className="underline" href={`mailto:${CONTACT}`}>
              {CONTACT}
            </a>{" "}
            and we'll reply within 30 days.
          </p>
          <p>
            We'll update this page if anything changes, and change the date at the top.{" "}
            <Link to="/" className="underline">
              Back to the home page
            </Link>
          </p>
        </Section>
      </main>
    </>
  );
}
