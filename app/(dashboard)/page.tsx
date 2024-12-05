import UserProfile from "@/components/UserProfile";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="text-4xl px-5 mx-20 pt-5">
      <h1>Dasboard comming soon</h1>
    </div>
  );
}
