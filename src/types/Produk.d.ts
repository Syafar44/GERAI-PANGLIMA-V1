import { DateValue } from "@heroui/react";

interface IProduk {
  _id?: string;
  category?: string;
  title?: string;
  description?: string;
  price?: number;
  image?: string | FileList;
  tags?: string[];
  slug?: string;
  createdAt?: string | DateValue
}

export type { IProduk };
