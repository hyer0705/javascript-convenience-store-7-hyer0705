import { Console } from '@woowacourse/mission-utils';

class InputView {
  async readItem(message) {
    return Console.readLineAsync(message);
  }
}

export default InputView;
