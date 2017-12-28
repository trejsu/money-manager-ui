import Moment from "moment";

export default class DateGenerator {
  constructor() {
    Moment.locale("pl");
    this.FORMAT = "YYYY-MM-DD";
  }

  getFirstDayOfCurrentYear() {
    return Moment()
      .startOf('year')
      .format(this.FORMAT);
  }

  getToday() {
    return Moment()
      .format(this.FORMAT);
  }

  getTomorrow() {
    return Moment()
      .add(1, 'day')
      .format(this.FORMAT);
  }

  getYesterday() {
    return Moment()
      .subtract(1, 'day')
      .format(this.FORMAT);
  }

  getFirstDayOfCurrentMonth() {
    return Moment()
      .startOf('month')
      .format(this.FORMAT);
  }

  getFirstDayOfLastMonth() {
    return Moment()
      .subtract(1, 'month')
      .startOf('month')
      .format(this.FORMAT);
  }

  getLastDayOfLastMonth() {
    return Moment()
      .subtract(1, 'month')
      .endOf('month')
      .format(this.FORMAT);
  }

  getFirstDayOfTwoMonthsAgo() {
    return Moment()
      .subtract(2, 'month')
      .startOf('month')
      .format(this.FORMAT);
  }

  getLastDayOfTwoMonthsAgo() {
    return Moment()
      .subtract(2, 'month')
      .endOf('month')
      .format(this.FORMAT);
  }

  getDate(index) {
    let start = "";
    let end = "";
    switch(index) {
      case 0: {
        start = this.getFirstDayOfCurrentYear();
        end = this.getToday();
        break;
      }
      case 1: {
        start = this.getFirstDayOfTwoMonthsAgo();
        end = this.getLastDayOfTwoMonthsAgo();
        break;
      }
      case 2: {
        start = this.getFirstDayOfLastMonth();
        end = this.getLastDayOfLastMonth();
        break;
      }
      case 3: {
        start = this.getFirstDayOfCurrentMonth();
        end = this.getToday();
        break;
      }
      default: {
        start = this.getFirstDayOfCurrentMonth();
        end = this.getToday();
      }
    }
    return {
      start: start,
      end: end
    };
  }

  getDateForBudgetTabs(index) {
    let startMin = "";
    let startMax = "";
    let endMin = "";
    let endMax = "";
    switch(index) {
      case 0: {
        endMax = this.getYesterday();
        break;
      }
      case 1: {
        startMax = this.getToday();
        endMin = this.getToday();
        break;
      }
      case 2: {
        startMin = this.getTomorrow();
        break;
      }
      default: {
        startMax = this.getToday();
        endMin = this.getToday();
      }
    }
    return {
      startMin: startMin,
      startMax: startMax,
      endMin: endMin,
      endMax: endMax
    };
  }
}
