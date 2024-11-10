import { DateTimes } from '@woowacourse/mission-utils';

class Promotion {
  constructor(name, buy, get, startDate, endDate) {
    this.name = name;
    this.buy = buy;
    this.get = get;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  isValid() {
    const today = DateTimes.new();

    return today >= this.startDate && today <= this.endDate;
  }
}

export default Promotion;
