import ConvenienceStore from '../src/models/ConvenienceStore';
import Product from '../src/models/Product';

describe('편의점 테스트', () => {
  test('products.md 파일에서 상품 읽어오기', () => {
    // given
    const convenienceStore = new ConvenienceStore();

    // when
    convenienceStore.loadProducts();

    // then
    expect(convenienceStore.products).toEqual([
      new Product('콜라', 1000, 10, 10, '탄산2+1'),
      new Product('사이다', 1000, 7, 8, '탄산2+1'),
      new Product('오렌지주스', 1800, 0, 9, 'MD추천상품'),
      new Product('탄산수', 1200, 0, 5, '탄산2+1'),
      new Product('물', 500, 10, 0, null),
      new Product('비타민워터', 1500, 6, 0, null),
      new Product('감자칩', 1500, 5, 5, '반짝할인'),
      new Product('초코바', 1200, 5, 5, 'MD추천상품'),
      new Product('에너지바', 2000, 5, 0, null),
      new Product('정식도시락', 6400, 8, 0, null),
      new Product('컵라면', 1700, 10, 1, 'MD추천상품'),
    ]);
  });
});
