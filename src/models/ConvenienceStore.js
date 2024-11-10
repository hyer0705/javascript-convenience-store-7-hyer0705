import fs from 'fs';
import { Console } from '@woowacourse/mission-utils';
import Product from './Product';

class ConvenienceStore {
  products;

  constructor() {
    this.products = [];
  }

  loadProducts() {
    try {
      const data = fs.readFileSync('public/products.md', 'utf-8').trim().split('\n').slice(1);
      const productsMap = this.createProductsMap(data);

      productsMap.forEach(({ name, promotion, price, generalQuantity, promotionQuantity }) =>
        this.products.push(new Product(name, price, generalQuantity, promotionQuantity, promotion)),
      );
    } catch (error) {
      Console.print(error);
    }
  }

  createProductsMap(productDataLines) {
    const productsMap = new Map();

    productDataLines.forEach(product => {
      const [name, price, quantity, promotion] = product.split(',');

      if (!productsMap.has(name)) productsMap.set(name, this.initProductEntry(name, price));
      productsMap.set(name, this.createProductData(productsMap.get(name), quantity, promotion));
    });

    return productsMap;
  }

  initProductEntry(name, price) {
    return { name, price: +price, generalQuantity: 0, promotionQuantity: 0, promotion: null };
  }

  createProductData(currentProductData, quantity, promotion) {
    const { name, price, generalQuantity, promotionQuantity, promotion: currentPromotion } = currentProductData;

    if (promotion === 'null') return { name, price, promotion: currentPromotion, promotionQuantity, generalQuantity: +quantity };

    return { name, price, promotion, promotionQuantity: +quantity, generalQuantity };
  }
}

export default ConvenienceStore;
