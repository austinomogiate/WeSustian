"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Gift,
  Home,
  LogOut,
  Search,
  Trophy,
  UserCircle2,
} from "lucide-react";

import { useApp } from "@/lib/store";
import { Avatar, cn, LeafLogo } from "@/components/ui";

const navLinks = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/organizations", label: "Explore", icon: Search },
  { href: "/leaderboard", label: "Leaders", icon: Trophy },
  { href: "/donate", label: "Donate", icon: Gift },
  { href: "/impact", label: "Impact", icon: UserCircle2 },
];

const publicPaths = ["/", "/auth/login", "/auth/signup"];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, signOut } = useApp();

  const showAppNav = isAuthenticated && !publicPaths.includes(pathname);

  const handleSignOut = () => {
    signOut();
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href={isAuthenticated ? "/dashboard" : "/"}
          className="flex items-center gap-2 text-lg font-extrabold text-slate-900"
        >
          <LeafLogo className="h-8 w-8" />
          We Sustain
        </Link>

        {showAppNav ? (
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition",
                    active
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        ) : null}

        {showAppNav ? (
          <div className="flex items-center gap-3">
            <Link href="/impact" className="hidden sm:block">
              <Avatar initials={user.initials} size="sm" />
            </Link>
            <button
              onClick={handleSignOut}
              className="hidden items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-brand-600 hover:text-brand-700 md:flex"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/auth/login"
              className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-brand-700"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-lg bg-brand-600 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Get started
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export function MobileTabBar() {
  const pathname = usePathname();
  const { isAuthenticated } = useApp();

  if (!isAuthenticated || publicPaths.includes(pathname)) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white md:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {navLinks.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-semibold transition",
                active ? "text-brand-600" : "text-slate-400"
              )}
            >
              <link.icon className={cn("h-5 w-5", active && "text-brand-600")} />
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
