"use client";

const CAL_LINK = "https://cal.com/consult-with-riz/work";

export default function CalBookingButton({
  children,
  className,
  style,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  return (
    <a
      href={CAL_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
