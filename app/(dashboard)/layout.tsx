import MainNavBar from "@/components/NavBar/NavBar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  return (
    <section>
      <MainNavBar />
      {children}
    </section>
  );
}
