const dates = require("../lib/dates");

describe("dates", () => {
  describe("total days", () => {
    test("from 2020-04-20 to 2020-04-30 to equal 11", () => {
      expect(dates.totalDays("2020-04-20", "2020-04-30")).toBe(11);
    });

    test("from 2020-08-15 to 2020-08-31 to equal 17", () => {
      expect(dates.totalDays("2020-08-15", "2020-08-31")).toBe(17);
    });
  });

  describe("business days", () => {
    test("from 2019-09-30 to 2019-10-07 to equal 6", () => {
      expect(dates.businessDays("2019-09-30", "2019-10-07")).toBe(6);
    });

    test("from 2019-09-30 to 2019-10-07 to equal 6", () => {
      expect(dates.businessDays("2019-12-25", "2020-01-06")).toBe(9);
    });
  });
});
