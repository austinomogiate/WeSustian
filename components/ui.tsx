import Link from "next/link";
import type { ReactNode } from "react";

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Card({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  const base =
    "rounded-2xl border border-slate-100 bg-white p-5 shadow-sm";
  if (href) {
    return (
      <Link
        href={href}
        className={cn(base, "block transition hover:border-brand-200 hover:shadow-md", className)}
      >
        {children}
      </Link>
    );
  }
  return <div className={cn(base, className)}>{children}</div>;
}

export function Avatar({
  initials,
  className,
  size = "md",
}: {
  initials: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-11 w-11 text-sm",
    lg: "h-14 w-14 text-lg",
    xl: "h-16 w-16 text-xl",
  };
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-brand-600 font-bold text-white",
        sizes[size],
        className
      )}
    >
      {initials}
    </span>
  );
}

export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold",
        className ?? "bg-brand-100 text-brand-700"
      )}
    >
      {children}
    </span>
  );
}

export function ProgressBar({
  value,
  total,
  className,
  barClassName,
}: {
  value: number;
  total: number;
  className?: string;
  barClassName?: string;
}) {
  const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-200", className)}>
      <div
        className={cn("h-full rounded-full bg-brand-500", barClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function SectionHeading({
  title,
  action,
  href,
}: {
  title: string;
  action?: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      {action && href ? (
        <Link href={href} className="text-sm font-bold text-brand-600 hover:underline">
          {action}
        </Link>
      ) : null}
    </div>
  );
}

export function StatTile({
  icon,
  value,
  label,
  iconClassName,
}: {
  icon: ReactNode;
  value: string;
  label: string;
  iconClassName?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div
        className={cn(
          "mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full",
          iconClassName ?? "bg-brand-50 text-brand-600"
        )}
      >
        {icon}
      </div>
      <p className="text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

export function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "danger";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}) {
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 border-brand-600",
    outline: "bg-white text-brand-700 border-slate-300 hover:border-brand-600",
    ghost: "bg-transparent text-brand-700 border-transparent hover:bg-brand-50",
    danger: "bg-white text-rose-700 border-rose-200 hover:bg-rose-50",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold transition disabled:opacity-50",
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
}

export function Field({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-bold text-slate-700">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
        {icon}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full bg-transparent py-2.5 text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}

export function LeafLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-brand-600 text-white",
        className ?? "h-8 w-8"
      )}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-1/2 w-1/2" aria-hidden="true">
        <path d="M20 3s-7.5-1-12 3.5C4.5 9.9 4 14 4 14l2 2s4.1-.5 7.5-4C18 7.5 17 3 20 3z" />
        <path
          d="M5 19c2-5 6-8 10-9"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
