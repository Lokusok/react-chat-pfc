import axios from 'axios';

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
      const response = await rootApi.get(`/${options.product}`, params);
      return response.data;
    } catch (err) {
      return {
        error: 'Ошибка при получении продукта',
      };
    }
  }
}

export default ApiService;
