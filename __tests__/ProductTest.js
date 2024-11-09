describe('상품 테스트', () => {
  test('파일에 있는 상품으로 상품 객체 생성 및 toString()', async () => {
    // given
    const product = new Product(콜라, 1000, 10, 10, '탄산2+1');

    // when
    const output = product.toString();

    // then
    expect(output).toBe('- 콜라 1,000원 10개 탄산2+1\n- 콜라 1,000원 10개');
  });
});
