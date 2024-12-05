"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PlanData from "./plansData";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

export default function Plans() {
  const { user } = useUser();
  const handleClick = async (id: number) => {
    const res = await axios.post(`/api/checkout`, {
      productId: id,
      userId: user?.id,
    });
    window.location = res.data.url;
  };
  return (
    <div className="w-full ">
      <h1 className="text-3xl  text-center my-10 font-bold">
        Choose the Perfect Data Entry AI Plan
      </h1>
      <div className="max-w-[80rem] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-5 flex-wrap mx-auto  justify-between px-4 my-12">
        {PlanData.map((plan) => (
          //   <Link target="_blank" href={plan.payment_links}>
          <Card key={plan.id} className="w-full ">
            <CardHeader>
              <CardTitle>{plan.plansName}</CardTitle>
              <CardDescription className="pt-5">
                <div className="flex text-black items-center">
                  <h2 className="text-4xl font-semibold">{plan.price}</h2>
                  <div className="bg-blue-600 text-white py-1 rounded-full px-4 text-sm mx-5">
                    {plan.discount}
                  </div>
                </div>
                <p>{plan.billed}</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleClick(plan.id)}
                disabled={user?.publicMetadata.subscribed == plan.id}
                className="w-full uppercase"
              >
                {user?.publicMetadata.subscribed == plan.id
                  ? "Already upgraded"
                  : plan.button_text}
              </Button>
              <h3 className="text-xl py-5">{plan.plan_for}</h3>
              <ul className="space-y-2 text-gray-600">
                {plan.features.map((item) => (
                  <li key={item} className="flex gap-x-2 items-center">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          //   </Link>
        ))}
      </div>
    </div>
  );
}
