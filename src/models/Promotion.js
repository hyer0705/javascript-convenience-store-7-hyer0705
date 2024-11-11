import { DateTimes } from '@woowacourse/mission-utils';

class Promotion {
  constructor(name, buy, get, startDate, endDate) {
    this.name = name;
    this.buy = buy;
    this.get = get;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  isValid() {
    const today = DateTimes.now();

    return today >= new Date(this.startDate) && today <= new Date(this.endDate);
  }

  validatePromotion(purchaseQuantity, promotionStock) {
    const maxPromotionSetsFromStock = Math.floor(promotionStock / (this.buy + this.get));
    const maxPromotionSetsFromPurchase = Math.floor(purchaseQuantity / (this.buy + this.get));

    if (purchaseQuantity % (this.buy + this.get) === this.buy) {
      return {
        promotionQuantity: 0,
        generalQuantity: purchaseQuantity,
        message: `MORE`,
      };
    }

    if (maxPromotionSetsFromPurchase <= maxPromotionSetsFromStock) {
      return { promotionQuantity: purchaseQuantity, generalQuantity: 0, message: null };
    }

    const applicablePromotionQuantity = maxPromotionSetsFromStock * (this.buy + this.get);
    const nonPromotionQuantity = purchaseQuantity - applicablePromotionQuantity;

    return {
      promotionQuantity: applicablePromotionQuantity,
      generalQuantity: nonPromotionQuantity,
      message: `NOT_APPLICABLE`,
    };
  }
}

export default Promotion;
