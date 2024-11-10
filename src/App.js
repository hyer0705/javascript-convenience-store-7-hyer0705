import ConvenienceStore from './models/ConvenienceStore.js';
import OutputView from './utils/OutputView.js';

class App {
  async run() {
    const conveinenceStore = new ConvenienceStore();
    conveinenceStore.loadProducts();

    const outputView = new OutputView();
    outputView.printWelcome();
    outputView.printProducts(conveinenceStore.getProducts());
  }
}

export default App;
