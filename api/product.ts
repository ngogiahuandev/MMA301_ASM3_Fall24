import { axiosInstance } from "@/api";
import { Product } from "@/types";

export namespace ProductApi {
  export async function getAll(filters?: Partial<Product>): Promise<Product[]> {
    try {
      const response = await axiosInstance.get<Product[]>("/products", {
        params: filters,
      });
      return response.data;
    } catch (error) {
      return [];
    }
  }

  export async function getById(id: string): Promise<Product | null> {
    try {
      const response = await axiosInstance.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }
}
