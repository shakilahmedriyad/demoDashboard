"use client";

import { useState } from "react";
import SignInForm from "./components/SignInForm";

export default function SinIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <SignInForm />
    </div>
  );
}
