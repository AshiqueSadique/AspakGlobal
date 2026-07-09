import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const response = intlMiddleware(request);
  const locale = request.cookies.get("NEXT_LOCALE")?.value;
  const pathname = request.nextUrl.pathname;

  const pathLocale = routing.locales.find(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );
  if (pathLocale && pathLocale !== locale) {
    (response as NextResponse).cookies.set("NEXT_LOCALE", pathLocale, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
