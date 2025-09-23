import { DateValue } from "@heroui/react";

interface IBanner {
  _id?: string;
  title?: string;
  image?: string | FileList;
  createdAt?: string | DateValue
}

export type { IBanner };
