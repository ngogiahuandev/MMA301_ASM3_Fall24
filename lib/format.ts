import { Comment, Product, RatingGoup } from "@/types";

export const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const getOriginalPrice = (price: number, discount: number) => {
  return price / (1 - discount);
};

export const formatDiscount = (discount: number) => {
  return `${discount * 100}% OFF`;
};

export const handlGroupRating = (product: Product): RatingGoup[] => {
  const ratingGroup = product.comments.reduce((acc, comment) => {
    const rating = Math.floor(comment.rating);
    const index = acc.findIndex((group) => group.rating === rating);

    if (index === -1) {
      acc.push({ rating, count: 1 });
    } else {
      acc[index].count += 1;
    }

    return acc;
  }, [] as RatingGoup[]);

  return ratingGroup;
};

export const handlGroupRatingByComments = (
  comments: Comment[]
): RatingGoup[] => {
  const ratingGroup = comments.reduce((acc, comment) => {
    const rating = Math.floor(comment.rating);
    const index = acc.findIndex((group) => group.rating === rating);

    if (index === -1) {
      acc.push({ rating, count: 1 });
    } else {
      acc[index].count += 1;
    }

    return acc;
  }, [] as RatingGoup[]);

  console.log(ratingGroup);

  return ratingGroup;
};

export const getAverageRating = (product: Product) => {
  const totalRating = product.comments.reduce((acc, comment) => {
    return acc + comment.rating;
  }, 0);

  return totalRating / product.comments.length;
};
