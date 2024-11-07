import { Console } from '@woowacourse/mission-utils';

class InputView {
  async readItem(message) {
    const input = await Console.readLineAsync(message);
    // ...
  }
}

export default InputView;
