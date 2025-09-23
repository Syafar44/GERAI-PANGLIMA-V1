import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import environment from "./config/environment";
import { JWTExtended } from "./types/Auth";

export async function middleware(request: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environment.AUTH_SECRET,
  });

  const { pathname } = request.nextUrl;
  const isLoginOrRegister =
    pathname === "/auth/login" || pathname === "/auth/register";
  const isAdminPage = pathname.startsWith("/admin");

  // Kalau sudah login tapi masih buka /auth/login atau /auth/register → redirect ke /admin
  if (isLoginOrRegister && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Kalau user belum login dan coba akses halaman admin → redirect ke login
  if (!token && isAdminPage) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // filter route yang mau dipasang middleware
    "/((?!_next/static|_next/image|api/auth|favicon.ico|manifest.json|icons|images|.*\\.png|.*\\.jpg|.*\\.webp).*)",
  ],
};
