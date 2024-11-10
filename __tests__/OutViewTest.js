import { MissionUtils } from '@woowacourse/mission-utils';
import { EOL as LINE_SEPARATOR } from 'os';
import OutputView from '../src/utils/OutputView';
import ConvenienceStore from '../src/models/ConvenienceStore';

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

const expectLogContainsWithoutSpacesAndEquals = (received, expects) => {
  const processedReceived = received.replace(/[\s=]/g, '');
  expects.forEach(exp => {
    expect(processedReceived).toContain(exp);
  });
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

const run = async ({ inputs = [], inputsToTerminate = [], expected = [], expectedIgnoringWhiteSpaces = [] }) => {
  // given
  const logSpy = getLogSpy();
  mockQuestions([...inputs, ...inputsToTerminate]);

  // when
  const convenienceStore = new ConvenienceStore();
  convenienceStore.loadProducts();
  const ouputView = new OutputView();
  ouputView.printProducts(convenienceStore.getProducts());

  //   const app = new App();
  //   await app.run();

  const output = getOutput(logSpy);

  // then
  if (expectedIgnoringWhiteSpaces.length > 0) {
    expectLogContainsWithoutSpacesAndEquals(output, expectedIgnoringWhiteSpaces);
  }
  if (expected.length > 0) {
    expectLogContains(output, expected);
  }
};

describe('출력 테스트', () => {
  test('파일에 있는 상품 목록 출력', async () => {
    await run({
      inputs: ['[콜라-1]', 'N', 'N'],
      expected: [
        /* prettier-ignore */
        "- 콜라 1,000원 10개 탄산2+1",
        '- 콜라 1,000원 10개',
        '- 사이다 1,000원 8개 탄산2+1',
        '- 사이다 1,000원 7개',
        '- 오렌지주스 1,800원 9개 MD추천상품',
        '- 오렌지주스 1,800원 재고 없음',
        '- 탄산수 1,200원 5개 탄산2+1',
        '- 탄산수 1,200원 재고 없음',
        '- 물 500원 10개',
        '- 비타민워터 1,500원 6개',
        '- 감자칩 1,500원 5개 반짝할인',
        '- 감자칩 1,500원 5개',
        '- 초코바 1,200원 5개 MD추천상품',
        '- 초코바 1,200원 5개',
        '- 에너지바 2,000원 5개',
        '- 정식도시락 6,400원 8개',
        '- 컵라면 1,700원 1개 MD추천상품',
        '- 컵라면 1,700원 10개',
      ],
    });
  });
});
