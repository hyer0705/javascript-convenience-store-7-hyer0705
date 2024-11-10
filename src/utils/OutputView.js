import { Console } from '@woowacourse/mission-utils';

class OutputView {
  printWelcome() {
    Console.print('안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n');
  }

  printProducts(products) {
    let str = '';
    products.forEach(product => {
      str += product.toString();
    });

    Console.print(`${str}`);
  }
}

export default OutputView;
