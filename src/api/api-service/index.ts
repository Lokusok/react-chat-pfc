import axios from 'axios';
import { TProduct } from '@/features/chat/store/products/types';

const rootApi = axios.create({
  baseURL: '/',
});

type TFullOptions = {
  product: Omit<TProducts, 'balanced'>;
  aLot: boolean;
};

type TShortOptions = {
  product: 'balanced';
};

type TGetProductOptions = TFullOptions | TShortOptions;

class ApiService {
  /**
   * Получить продукт
   */
  static async getProduct(options: TGetProductOptions) {
    try {
      const isFullOptions = 'aLot' in options;
      const params = isFullOptions
        ? {
            params: {
              aLot: options.aLot,
            },
          }
        : {};
      const response = await rootApi.get<TProduct>(
        `/${options.product}`,
        params
      );

      if (!response.data.title) throw new Error();

      return response.data;
    } catch (err) {
      return {
        error: 'Ошибка при получении продукта',
      };
    }
  }
}

export default ApiService;
