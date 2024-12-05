"use client";

import { ColumnDef } from "@tanstack/react-table";

export type DataType = {
  product_name: string;
  description: string;
  price: number;
  stock: string;
  category: string;
};

export const DataColumns: ColumnDef<DataType>[] = [
  {
    accessorKey: "product_name",
    header: "Product Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
];
