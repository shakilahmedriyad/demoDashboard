"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";

export default function UserProfile({ userId }: { userId: string }) {
  const { user } = useUser();
  console.log(user);

  const handleUpdate = async () => {
    await axios.post("/api/updateuser", {
      userId,
      first_name: "Shakil",
      last_name: "Ahmed",
      credit_left: 5,
      linked_in_url: "https://linkedin.com/",
    });
  };
  return (
    <div>
      <UserButton />
      <h1>User Profile</h1>
      <button onClick={handleUpdate}>Click me </button>
    </div>
  );
}
