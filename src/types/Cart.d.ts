interface ICartItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  qty: number;
}

export type { ICartItem };
