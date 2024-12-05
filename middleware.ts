import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({});

export const config = {
  matcher: ["/((?!_next|favicon.ico|public).*)"], // Apply to all routes except static files
};
