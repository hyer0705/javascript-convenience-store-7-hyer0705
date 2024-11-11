import { MissionUtils } from '@woowacourse/mission-utils';
import { EOL as LINE_SEPARATOR } from 'os';

const mockQuestions = inputs => {
  const messages = [];

  MissionUtils.Console.readLineAsync = jest.fn(prompt => {
    messages.push(prompt);
    const input = inputs.shift();

    if (input === undefined) {
      throw new Error('NO INPUT');
    }

    return Promise.resolve(input);
  });

  MissionUtils.Console.readLineAsync.messages = messages;
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

const getOutput = logSpy => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expects) => {
  expects.forEach(exp => {
    expect(received).toContain(exp);
  });
};

const run = async ({ inputs = [], expected = [], expectedIgnoringWhiteSpaces = [] }) => {
  const logSpy = getLogSpy();
  mockQuestions(inputs);

  const inputView = new inputView();
  await inputView.readPurchaseItems();

  const output = getOutput(logSpy);

  if (expectedIgnoringWhiteSpaces.length > 0) {
    expectLogContains(output.replace(/\s/g, ''), expectedIgnoringWhiteSpaces);
  }
  if (expected.length > 0) {
    expectLogContains(output, expected);
  }
};

describe('입력 테스트', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('유효한 상품 입력', async () => {
    await run({
      inputs: ['[콜라-2],[사이다-3]'],
      expected: ['콜라 2개', '사이다 3개'],
    });
  });

  // test('잘못된 상품 형식 입력', async () => {
  //   await run({
  //     inputs: ['콜라-2', 'N', 'N'], // 형식 오류
  //     expected: ['[ERROR] 잘못된 입력 형식입니다. 다시 입력해 주세요.'],
  //   });
  // });

  // test('수량이 음수일 때 에러', async () => {
  //   await run({
  //     inputs: ['[콜라--1]'], // 음수 수량
  //     expected: ['[ERROR] 수량은 0 이상이어야 합니다. 다시 입력해 주세요.'],
  //   });
  // });

  // test('재고를 초과하는 수량 입력', async () => {
  //   await run({
  //     inputs: ['[컵라면-20]'], // 재고 초과
  //     expected: ['[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.'],
  //   });
  // });
});
