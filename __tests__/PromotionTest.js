import Promotion from '../src/models/Promotion.js';

describe('프로모션 할인 테스트', () => {
  test.each([
    [10, 7, { generalQuantity: 4, promotionQuantity: 6, message: '4개는 프로모션 할인이 적용되지 않습니다.' }],
    [3, 10, { generalQuantity: 0, promotionQuantity: 3, message: '' }],
  ])('프로모션 할인 가능 여부 확인 테스트', (inputQuantity, promotionStock, expected) => {
    // given
    const promotion = new Promotion('탄산2+1', 2, 1, '2024-01-01', '2024-12-31');

    // when
    const output = promotion.validatePromotion(inputQuantity, promotionStock);

    // then
    expect(output).toEqual(expected);
  });
});
