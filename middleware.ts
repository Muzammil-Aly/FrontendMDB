import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const loggedIn = req.cookies.get("loggedIn")?.value === "true";
  const publicPaths = ["/sign-in", "/forgot-password"];
  const isAuthPage = publicPaths.includes(req.nextUrl.pathname);

  // If not logged in and trying to access protected page
  if (!loggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // If logged in and trying to access auth page (e.g. sign-in again)
  if (loggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/customer-profile", req.url));
  }

  return NextResponse.next();
}

// ✅ apply to all routes (adjust if needed)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
