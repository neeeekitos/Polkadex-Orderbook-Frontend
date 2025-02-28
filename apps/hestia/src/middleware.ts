import { defaultConfig } from "@orderbook/core/config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { enableLmp: isRewardsActive } = defaultConfig;

  if (!isRewardsActive) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/rewards", "/rewards/:path*"],
};
