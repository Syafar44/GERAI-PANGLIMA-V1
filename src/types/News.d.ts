import { DateValue } from "@heroui/react";

interface INews {
  _id?: string;
  title?: string;
  description?: string;
  image?: string | FileList;
  slug?: string;
  createdAt?: string | DateValue
}

export type { INews };
