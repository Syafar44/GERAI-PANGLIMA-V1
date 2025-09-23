import { DateValue } from "@heroui/react";

interface IContent {
  _id?: string;
  title?: string;
  link?: string;
  image?: string | FileList;
  createdAt?: string | DateValue
}

export type { IContent };
