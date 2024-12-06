"use client";

import { DataTable } from "@/components/DataTable/DataTable";
import { DataColumns, DataType } from "./DataColumn";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

export default function Table() {
  const { user, isLoaded } = useUser();
  const [Datas, setDatas] = useState<DataType[]>([]);
  const [currentEntry, setCurrentEntry] = useState(0);

  const form = useForm({
    defaultValues: {
      product_name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
    },
  });

  useEffect(() => {
    if (isLoaded && user) {
      setDatas(user?.publicMetadata.entry as Array<DataType>);
    }
  }, [user, isLoaded]);
  //@ts-nocheck
  const handleSubmission = async (data: any) => {
    if (!isLoaded || !user) {
      return;
    }
    try {
      //@ts-expect-error
      if (user.publicMetadata.credit_left - currentEntry < 1) {
        return;
      }
      setDatas((datas) => [data, ...datas]);
      setCurrentEntry((val) => val + 1);
      form.reset();
      await axios.post("/api/addEntry", { data, userId: user?.id });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-4xl font-semibold">Data Table</h1>
      <p className=" mb-10 mt-2.5 ">
        you have{"  "}
        {Number(user?.publicMetadata.credit_left)
          ? Number(user?.publicMetadata.credit_left) - currentEntry
          : 0}{" "}
        entry left upgrade your membership to entry more
      </p>

      <DataTable columns={DataColumns} data={Datas} />

      <Form {...form}>
        <form className="mt-10" onSubmit={form.handleSubmit(handleSubmission)}>
          <div className="w-full flex flex-wrap gap-x-16 gap-y-5">
            <FormField
              control={form.control}
              name="product_name"
              render={({ field }) => (
                <div className="space-y-2 max-w-[20rem] w-full">
                  <FormLabel className="text-base">Product name</FormLabel>
                  <Input placeholder="Product name" {...field} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <div className="space-y-2 max-w-[20rem] w-full">
                  <Label className="text-base">Descriptions</Label>
                  <Input placeholder="Descriptions" {...field} />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <div className="space-y-2 max-w-[20rem] w-full">
                  <Label className="text-base">Price</Label>
                  <Input {...field} placeholder="Price" type="number" />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <div className="space-y-2 max-w-[20rem] w-full">
                  <Label className="text-base">Category</Label>
                  <Input {...field} placeholder="Category" />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <div className="space-y-2 max-w-[20rem] w-full">
                  <Label className="text-base">Stock</Label>
                  <Input {...field} placeholder="Category" />
                </div>
              )}
            />
          </div>

          <Button
            disabled={
              //@ts-expect-error
              user?.publicMetadata?.credit_left - currentEntry < 1
            }
            className="mt-8"
            type="submit"
          >
            {
              //@ts-expect-error
              user?.publicMetadata?.credit_left - currentEntry < 1
                ? "upgrade membership to add more"
                : "Add data"
            }
          </Button>
        </form>
      </Form>
    </div>
  );
}
