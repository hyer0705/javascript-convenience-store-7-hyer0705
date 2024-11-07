class Product {
  constructor([name, price, quantity, promotion]) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.promotion = promotion;
  }

  toString() {
    return `- ${this.name} ${Number(this.price).toLocaleString('ko-KR')}원 ${this.quantity}개 ${this.promotion}`;
  }
}

export default Product;
