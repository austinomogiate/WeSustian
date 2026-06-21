import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const protectedPaths = [
  "/dashboard",
  "/organizations",
  "/leaderboard",
  "/donate",
  "/impact",
  "/admin",
];
const authPaths = ["/auth/login", "/auth/signup"];

function pathStartsWith(pathname: string, paths: string[]) {
  return paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export async function middleware(request: NextRequest) {
  const hasSupabaseEnv =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Frontend-only mode: skip auth checks until Supabase env vars are configured.
  if (!hasSupabaseEnv) {
    return NextResponse.next();
  }

  const { supabase, response } = await updateSession(request);
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isProtectedPath = pathStartsWith(pathname, protectedPaths);
  const isAuthPath = pathStartsWith(pathname, authPaths);

  if (!user && isProtectedPath) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (user && isAuthPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const role = user?.user_metadata?.role;
    if (!user || role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
