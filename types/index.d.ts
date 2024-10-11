export type User = {
  name: string;
  image: string;
};

export type Comment = {
  user: User;
  rating: number;
  content: string;
  timestamp: Date;
};

export type Product = {
  id: string;
  artName: string;
  price: number;
  description: string;
  glassSurface: boolean;
  image: string;
  brand: string;
  limitedTimeDeal: number;
  comments: Comment[];
};
