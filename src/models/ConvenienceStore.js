import fs from 'fs';
import { Console } from '@woowacourse/mission-utils';
import Product from './Product.js';
import OutputView from '../utils/OutputView.js';
import InputView from '../utils/InputView.js';
import Promotion from './Promotion.js';

class ConvenienceStore {
  products;

  promotions;

  purchaseItems;

  #ouputView;

  #inputView;

  constructor() {
    this.products = [];
    this.promotions = [];
    this.purchaseItems = [];

    this.#ouputView = new OutputView();
    this.#inputView = new InputView();
  }

  getProducts() {
    return this.products;
  }

  start() {
    this.welcome();

    Console.print(this.promotion);
    // this.inputPurchaseItems();
  }

  welcome() {
    this.loadProducts();
    this.loadPromotions();

    this.#ouputView.printWelcome();
    this.#ouputView.printProducts(this.products);
  }

  loadProducts() {
    try {
      const data = fs.readFileSync('public/products.md', 'utf-8').trim().split('\n').slice(1);
      const productsMap = this.createProductsMap(data);

      productsMap.forEach(({ name, promotion, price, generalQuantity, promotionQuantity }) =>
        this.products.push(new Product(name, price, generalQuantity, promotionQuantity, promotion)),
      );
    } catch (error) {
      Console.print('[ERROR]');
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

  loadPromotions() {
    try {
      const data = fs.readFileSync('public/promotions.md', 'utf-8').trim().split('\n').slice(1);

      data.forEach(promotion => {
        const [name, buy, get, startDate, endDate] = promotion.split(',');

        this.promotions.push(new Promotion(name, +buy, +get, startDate, endDate));
      });
    } catch (error) {
      Console.print(error);
    }
  }

  async inputPurchaseItems() {
    try {
      const input = await this.#inputView.readPurchaseItems();
      const items = this.validateInputPurchaseItems(input);

      this.addPurchaseItems(items);
    } catch (error) {
      Console.print(error.message);
      this.inputPurchaseItems();
    }
  }

  validateInputPurchaseItems(input) {
    const regexp = /^\[([A-Za-z가-힣]+-\d+)\](?:,\[([A-Za-z가-힣]+-\d+)\])*$/;

    if (!input.match(regexp)) throw new Error('[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.\n');

    const items = input.split(',').map(item => item.match(/\[([A-Za-z가-힣]+)-(\d+)\]/).slice(1));

    items.forEach(([name, quantity]) => this.validatePurchaseItem(name, quantity));

    return items;
  }

  validatePurchaseItem(name, quantity) {
    const product = this.products.find(product => product.name === name);

    if (!product) throw new Error('[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.\n');

    if (+quantity > product.generalQuantity + product.promotionQuantity)
      throw new Error('[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.\n');
  }

  addPurchaseItems(items) {
    items.forEach(([name, quantity]) => {});
  }
}

export default ConvenienceStore;
