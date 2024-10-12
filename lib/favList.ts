import { Product } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export namespace FavList {
  export const get = async (): Promise<Product[]> => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        const favList = JSON.parse(favorites) as Product[];
        return favList;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  export const add = async (product: Product): Promise<void> => {
    const favList = await get();
    favList.push(product);
    await AsyncStorage.setItem("favorites", JSON.stringify(favList));
  };

  export const remove = async (product: Product): Promise<void> => {
    const favList = await get();
    const newFavList = favList.filter((item) => item.id !== product.id);
    await AsyncStorage.setItem("favorites", JSON.stringify(newFavList));
  };

  export const check = async (product: Product): Promise<boolean> => {
    const favList = await get();
    return favList.some((item) => item.id === product.id);
  };

  export const toggle = async (product: Product): Promise<void> => {
    const isFavorite = await check(product);
    if (isFavorite) {
      await remove(product);
    } else {
      await add(product);
    }
  };
}
