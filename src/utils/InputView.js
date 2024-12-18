import { Console } from '@woowacourse/mission-utils';

class InputView {
  readPurchaseItems() {
    return Console.readLineAsync('구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n');
  }

  async addPromotionItem(message) {
    try {
      const isAddingItem = await Console.readLineAsync(`${message} 추가하시겠습니까? (Y/N)\n`);
      this.validateYesOrNo(isAddingItem);

      return isAddingItem;
    } catch (error) {
      Console.print(error.message);
      return this.addPromotionItem(message);
    }
  }

  async isProceedWithoutPromotion(message) {
    try {
      const isWithoutPromotion = await Console.readLineAsync(`${message} 그래도 구매하시겠습니까? (Y/N)\n`);
      this.validateYesOrNo(isWithoutPromotion);

      return isWithoutPromotion;
    } catch (error) {
      Console.print(error.message);
      return this.isProceedWithoutPromotion(message);
    }
  }

  async readMembershipDiscount() {
    try {
      const isMembershipDiscount = await Console.readLineAsync('멤버십 할인을 받으시겠습니까? (Y/N)\n');
      this.validateYesOrNo(isMembershipDiscount);

      return isMembershipDiscount;
    } catch (error) {
      Console.print(error.message);
      return this.readMembershipDiscount();
    }
  }

  async readAdditionalPurchase() {
    try {
      const input = await Console.readLineAsync('감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n');
      this.validateYesOrNo(input);

      return input;
    } catch (error) {
      Console.print(error.message);
      return this.readAdditionalPurchase();
    }
  }

  validateYesOrNo(input) {
    if (input !== 'Y' && input !== 'N') throw new Error('[ERROR] 잘못된 형식입니다. 다시 입력해주세요.');
  }
}

export default InputView;
