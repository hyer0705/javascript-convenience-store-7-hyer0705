import ConvenienceStore from './models/ConvenienceStore.js';

class App {
  async run() {
    const conveinenceStore = new ConvenienceStore();
    await conveinenceStore.start();
  }
}

export default App;
