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

    this.inputPurchaseItems();
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

      await this.addPurchaseItems(items);
    } catch (error) {
      Console.print(error.message);
      this.inputPurchaseItems();
    }
  }

  validateInputPurchaseItems(input) {
    const regexp = /^\[([A-Za-z가-힣]+-\d+)\](?:,\[([A-Za-z가-힣]+-\d+)\])*$/;

    if (!input.match(regexp)) throw new Error('[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.\n');

    const items = input.split(',').map(item => item.match(/\[([A-Za-z가-힣]+)-(\d+)\]/).slice(1));

    return items.map(([name, quantity]) => this.validatePurchaseItem(name, quantity));
  }

  validatePurchaseItem(name, quantity) {
    const product = this.products.find(product => product.name === name);

    if (!product) throw new Error('[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.\n');

    if (+quantity > product.generalQuantity + product.promotionQuantity)
      throw new Error('[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.\n');

    return [name, Number(quantity)];
  }

  addPurchaseItems(items) {
    items.forEach(([name, quantity]) => {
      const findProduct = this.products.find(product => product.name === name);
      const findPromotion = this.promotions.find(promotion => promotion.name === findProduct.promotion);

      const purchaseItem = this.createPurchaseItem(quantity, findProduct, findPromotion);

      this.purchaseItems.push(purchaseItem);
    });
  }

  isPromotion(promotion) {
    return promotion !== null;
  }

  createPurchaseItem(quantity, product, promotion) {
    const isValid = this.isPromotion(product.promotion) && promotion.isValid();

    if (isValid) return this.applyPromotion(quantity, product, promotion);

    return { name: product.name, totalQuantity: quantity, promotionQuantity: 0 };
  }

  applyPromotion(quantity, product, promotion) {
    const { generalQuantity, promotionQuantity, message } = promotion.validatePromotion(quantity, product.promotionQuantity);

    if (message === 'MORE') {
      return this.addPromotionItem(quantity, product, promotion);
    }

    if (message === 'NOT_APPLICABLE') {
      return this.askProceedWithoutPromotion(promotionQuantity, generalQuantity, product);
    }

    return { name: product.name, totalQuantity: quantity, promotionQuantity };
  }

  async addPromotionItem(quantity, product, promotion) {
    const isAddingPromotionItem = await this.#inputView.addPromotionItem(
      `현재 ${product.name}은(는) ${promotion.get}개를 무료로 더 받을 수 있습니다.`,
    );

    if (isAddingPromotionItem === 'N') {
      return { name: product.name, totalQuantity: quantity, promotionQuantity: 0 };
    }

    return { name: product.name, totalQuantity: quantity + 1, promotionQuantity: quantity + 1 };
  }

  async askProceedWithoutPromotion(promotionQuantity, generalQuantity, product) {
    const isWithoutPromotion = await this.#inputView.isProceedWithoutPromotion(
      `현재 ${product.name} ${generalQuantity}개는 프로모션 할인이 적용되지 않습니다.`,
    );

    if (isWithoutPromotion === 'N') {
      return { name: product.name, totalQuantity: promotionQuantity, promotionQuantity };
    }

    return { name: product.name, totalQuantity: promotionQuantity + generalQuantity, promotionQuantity };
  }
}

export default ConvenienceStore;
