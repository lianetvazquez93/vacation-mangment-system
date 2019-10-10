const dates = require("../lib/utils/dates");

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

  describe("emailDates", () => {
    test("for Sat Feb 15 2020 01:00:00 GMT+0100 (Central European Standard Time) to equal Sat, 15 Feb 2020", () => {
      expect(
        dates.emailDates("Sat Feb 15 2020 01:00:00 GMT+0100 (Central European Standard Time)")
      ).toBe("Sat, 15 Feb 2020");
    });

    test("for Thu Feb 20 2020 01:00:00 GMT+0100 (Central European Standard Time) to equal Thu, 20 Feb 2020", () => {
      expect(
        dates.emailDates("Thu Feb 20 2020 01:00:00 GMT+0100 (Central European Standard Time)")
      ).toBe("Thu, 20 Feb 2020");
    });
  });
});
