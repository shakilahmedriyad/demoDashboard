"use client";
import { OAuthStrategy } from "@clerk/types";
import { useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/icons/GoogleIcons";
import AppleIcons from "@/components/icons/AppleIcon";
export default function GoogleAuth() {
  const { signUp } = useSignUp();

  if (!signUp) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sign-up/sso-callback",
      redirectUrlComplete: "/",
    });
  };
  return (
    <div className="w-full flex gap-x-8">
      <Button
        variant={"outline"}
        className="border-black w-full"
        onClick={() => signInWith("oauth_google")}
      >
        <GoogleIcon classname="w-[2.5rem]" />
        <p>Google</p>
      </Button>
      <Button
        variant={"outline"}
        className="border-black w-full"
        onClick={() => signInWith("oauth_apple")}
      >
        <AppleIcons classname="w-[2.5rem]" />
        <p>Apple</p>
      </Button>
    </div>
  );
}
