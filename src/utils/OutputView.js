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

  printTotalPrice(totalPurchaseItemsAmount, totalPrice, promotionDiscout, membershipDiscount) {
    Console.print('====================================');
    Console.print(`총구매액\t\t${totalPurchaseItemsAmount}\t${totalPrice.toLocaleString('ko-KR')}`);
    Console.print(`행사할인\t\t\t-${promotionDiscout.toLocaleString('ko-KR')}`);
    Console.print(`멤버십할인\t\t\t-${membershipDiscount.toLocaleString('ko-KR')}`);
    Console.print(`내실돈\t\t\t\t${totalPrice - promotionDiscout - membershipDiscount}`);
  }
}

export default OutputView;
