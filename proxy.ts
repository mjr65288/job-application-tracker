import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAMES = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
];

function hasSession(request: NextRequest): boolean {
  return SESSION_COOKIE_NAMES.some((name) => request.cookies.has(name));
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isSignInPage = pathname.startsWith("/sign-in");
  const isSignUpPage = pathname.startsWith("/sign-up");
  const isDashboard = pathname.startsWith("/dashboard");

  // Redirect signed-in users away from auth pages
  if ((isSignInPage || isSignUpPage) && hasSession(request)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users from dashboard to sign-in
  if (isDashboard && !hasSession(request)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
