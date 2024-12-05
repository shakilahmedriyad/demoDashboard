"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import GoogleAuth from "./GoogleAuth";
const formSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string(),
});

type SignInType = z.infer<typeof formSchema>;

export default function SignInForm() {
  const { signIn, isLoaded, setActive } = useSignIn();

  const form = useForm<SignInType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = (values: SignInType) => {
    console.log("SignIn");
  };

  return (
    <div className="max-w-[28rem]  rounded-3xl shadow-2xl w-full py-10 h-full px-10">
      <h1 className="text-4xl">Log into your account</h1>
      <p className="text-sm mt-4  mb-8">
        Don{"'"}t have an account ?{" "}
        <Link className="text-blue-800 underline" href={"/sign-up"}>
          Sign up
        </Link>
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input
                  className="duration-300"
                  {...field}
                  placeholder="example@gmail.com"
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input
                  className="duration-300"
                  {...field}
                  placeholder="example@gmail.com"
                />
              </FormItem>
            )}
          />
          <Button className="w-full">Log in</Button>
          <div className="flex gap-x-3 text-sm mt-8 items-center">
            <hr className="w-full border-gray-400" />
            <p className="min-w-fit inline-block">Or register with</p>
            <hr className="w-full border-gray-400" />
          </div>
          <div className="flex mt-5 w-full">
            <GoogleAuth />
          </div>
        </form>
      </Form>
    </div>
  );
}
