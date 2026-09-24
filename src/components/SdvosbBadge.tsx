import sdvosbLogo from "@/assets/sdvosb-logo.webp";

const SDVOSB_ALT = "Service-Disabled Veteran-Owned Small Business (SDVOSB) certification logo";

type SdvosbLogoProps = {
  className?: string;
  loading?: "eager" | "lazy";
};

// Intrinsic size of the optimized asset; lets the browser reserve space before load.
export function SdvosbLogo({ className = "", loading = "eager" }: SdvosbLogoProps) {
  return (
    <img
      src={sdvosbLogo}
      alt={SDVOSB_ALT}
      width={500}
      height={375}
      loading={loading}
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}

type SdvosbBadgeProps = {
  /** Display utilities per breakpoint, e.g. "hidden xl:flex". The chip sets no display of its own. */
  className: string;
  /** The readable text label is hidden by default; reveal it where the header has room, e.g. "xl:flex". */
  labelClassName?: string;
};

/** Compact credential chip for site headers. */
export function SdvosbBadge({ className, labelClassName = "" }: SdvosbBadgeProps) {
  return (
    <div
      // Ring (not border) keeps the chip at 40px tall below lg so mobile header heights don't change.
      // Radius stays small relative to padding so the square logo never pokes past the rounded edge.
      className={`shrink-0 items-center gap-2 rounded-[6px] bg-white p-0.5 shadow-sm ring-1 ring-[#2a2a6e]/15 lg:rounded-[10px] lg:p-[3px] ${className}`}
    >
      <SdvosbLogo className="h-9 w-auto lg:h-10" />
      {/* Visual label only; the logo's alt text already announces the credential. */}
      <span aria-hidden="true" className={`hidden flex-col pr-2.5 leading-tight ${labelClassName}`}>
        <span className="text-[13px] font-bold whitespace-nowrap text-[#2a2a6e]">
          Veteran-Owned
        </span>
        <span className="text-[11px] font-semibold tracking-wider text-[#e02020] uppercase">
          SDVOSB
        </span>
      </span>
    </div>
  );
}
