import InputView from './utils/InputView.js';
import OutputView from './utils/OutputView.js';

class App {
  #outputView;

  #inputView;

  constructor() {
    this.#outputView = new OutputView();
    this.#inputView = new InputView();
  }

  async run() {
    this.#outputView.printProducts();
    this.#inputView.readItem('\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n');
  }
}

export default App;
