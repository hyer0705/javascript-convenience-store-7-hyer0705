import Product from '../src/models/Product.js';

describe('상품 테스트', () => {
  test.each([
    ['콜라', 1000, 10, 10, '탄산2+1', '- 콜라 1,000원 10개 탄산2+1\n- 콜라 1,000원 10개\n'],
    ['오렌지주스', 1800, 0, 9, 'MD추천상품', '- 오렌지주스 1,800원 9개 MD추천상품\n- 오렌지주스 1,800원 재고 없음\n'],
    ['물', 500, 10, 0, null, '- 물 500원 10개\n'],
  ])('상품이 %s, %i, %i, %i, %s 인 경우 toString() 호출한 경우', (name, price, generalQuantity, promotionQuantity, promotion, expected) => {
    // given
    const product = new Product(name, price, generalQuantity, promotionQuantity, promotion);

    // when
    // then
    expect(product.toString()).toBe(expected);
  });
});
