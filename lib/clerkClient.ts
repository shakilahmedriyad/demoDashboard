import { clerkClient } from "@clerk/nextjs/server";

export async function getClient() {
  return await clerkClient();
}
