import { UserButton, UserProfile } from "@clerk/nextjs";

export default function MainNavBar() {
  return (
    <nav className="flex px-24 py-6 items-center border-b justify-between">
      <h1 className="text-4xl font-semibold uppercase">Dashboard</h1>
      <UserButton />
    </nav>
  );
}
