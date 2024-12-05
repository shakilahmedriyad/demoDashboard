"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import GoogleAuth from "./GoogleAuth";

const emailExtensions = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "aol.com",
  "live.com",
  "protonmail.com",
  "zoho.com",
  "mail.com",
];

const formSchema = z.object({
  first_name: z.string().min(3, "First Name should be atleast 3 characters"),
  last_name: z.string().min(3, "Last Name should be atleast 3 characters"),
  email: z.string().email("Enter a valid email address"),
  linked_in_url: z.string().url("Enter a valid url"),
  password: z.string().min(8, "password must be atleast 8 characters"),
});

type SignUpType = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const { signUp, isLoaded, setActive } = useSignUp();
  const form = useForm<SignUpType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const handleSignUp = async (values: SignUpType) => {
    console.log(values);
    return;
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleVerification = async () => {
    const signature = await signUp?.attemptEmailAddressVerification({ code });
    if (signature?.status == "complete" && setActive) {
      await setActive({ session: signature.createdSessionId });
    }
  };

  return (
    <div className="flex">
      <div className="max-w-[28rem]  rounded-3xl shadow-2xl w-full py-10 h-full px-10">
        <h1 className="text-4xl ">Create an account </h1>
        <p className="text-sm mt-2  mb-10">
          Already have an account ?{" "}
          <Link className="text-blue-800 underline" href={"/sign-in"}>
            Sign in
          </Link>
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignUp)}
            className="space-y-7"
          >
            <div className="flex gap-x-7">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <Input
                      className="duration-300"
                      {...field}
                      placeholder="first_name"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        className="duration-300"
                        {...field}
                        placeholder="last_name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            {emailExtensions.includes(form.watch("email").split("@")[1]) && (
              <FormField
                control={form.control}
                name="linked_in_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Linked In</FormLabel>
                    <Input
                      className="duration-300"
                      {...field}
                      placeholder="Linked in"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <Input
                    className="duration-300"
                    type="password"
                    {...field}
                    placeholder="password"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Create Account
            </Button>
          </form>
          <div className="flex gap-x-3 text-sm mt-8 items-center">
            <hr className="w-full border-gray-400" />
            <p className="min-w-fit inline-block">Or register with</p>
            <hr className="w-full border-gray-400" />
          </div>
          <div className="flex mt-5 w-full">
            <GoogleAuth />
          </div>
        </Form>
      </div>
    </div>
  );
}
