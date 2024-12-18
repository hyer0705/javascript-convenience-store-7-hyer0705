class Product {
  name;

  price;

  generalQuantity;

  promotionQuantity;

  promotion;

  constructor(name, price, generalQuantity, promotionQuantity, promotion) {
    this.name = name;
    this.price = price;
    this.generalQuantity = generalQuantity;
    this.promotionQuantity = promotionQuantity;
    this.promotion = promotion;
  }

  toString() {
    if (this.generalQuantity === 0 && this.promotionQuantity > 0) {
      return `- ${this.name} ${this.price.toLocaleString('ko-KR')}원 ${this.promotionQuantity}개 ${this.promotion}\n- ${this.name} ${this.price.toLocaleString('ko-KR')}원 재고 없음\n`;
    }

    if (this.promotionQuantity === 0 && this.generalQuantity > 0) {
      return `- ${this.name} ${this.price.toLocaleString('ko-KR')}원 ${this.generalQuantity}개\n`;
    }

    return `- ${this.name} ${this.price.toLocaleString('ko-KR')}원 ${this.promotionQuantity}개 ${this.promotion}\n- ${this.name} ${this.price.toLocaleString('ko-KR')}원 ${this.generalQuantity}개\n`;
  }

  reduceStock(totalQuantity, promotionQuantity) {
    let cha = 0;
    if (promotionQuantity > 0) {
      cha = totalQuantity - Math.min(totalQuantity, this.promotionQuantity);
      this.promotionQuantity -= Math.min(totalQuantity, this.promotionQuantity);
    }

    if (cha > 0) this.generalQuantity -= cha;
  }
}

export default Product;
