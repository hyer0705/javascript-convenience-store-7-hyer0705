import fs from 'fs';

import { Console } from '@woowacourse/mission-utils';
import Product from '../models/Product.js';

class OutputView {
  printProducts() {
    try {
      const readProducts = fs.readFileSync('public/products.md', 'utf-8');
      const products = readProducts
        .trim()
        .split('\n')
        .slice(1)
        .map(product => new Product(product.split(',')));

      Console.print('안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n');

      const productsToString = products.map(product => product.toString());
      Console.print(productsToString.join('\n'));
    } catch (error) {
      Console.print(error.message);
    }
  }
}

export default OutputView;
