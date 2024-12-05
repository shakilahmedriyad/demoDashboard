import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";

export default function MainNavBar() {
  return (
    <nav className="flex w-full mx-auto px-5 py-6 items-center border-b justify-between">
      <Link href="/">
        <h1 className="sm:text-4xl text-2xl font-semibold uppercase">
          Dashboard
        </h1>
      </Link>
      <div className="flex items-center gap-x-5">
        <UserButton />
        <Link href={"/plans"}>
          <Button className="sm:text-base text-xs">upgrade membership</Button>
        </Link>
      </div>
    </nav>
  );
}
