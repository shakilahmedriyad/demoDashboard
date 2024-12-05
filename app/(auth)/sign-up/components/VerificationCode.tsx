"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export default function VerificationCode({
  resend,
  submitCode,
}: {
  resend: () => Promise<void>;
  submitCode: (code: string) => Promise<void>;
}) {
  const [wait, setWait] = useState(60);
  const [code, setCode] = useState("");
  useEffect(() => {
    const handleTime = () => {
      if (wait >= 0) {
        setWait((val) => val - 1);
      } else return clearTimeout(intervalId);
    };
    const intervalId = setInterval(handleTime, 1000);
    return () => clearInterval(intervalId);
  }, [wait]);
  const resendTime = () => {
    setWait(60);
    resend();
  };
  return (
    <div className="w-full space-y-7">
      <div className="space-y-4">
        <Label>Check your email for verification code</Label>
        <Input
          onChange={(e) => setCode(e.target.value)}
          placeholder="123-456"
        />
        <Button className="w-full" onClick={() => submitCode(code)}>
          Submit
        </Button>
      </div>
      <Button
        className="w-full"
        disabled={wait > 0}
        variant={"outline"}
        onClick={resendTime}
      >
        resend {wait < 0 ? "" : wait}
      </Button>
    </div>
  );
}
