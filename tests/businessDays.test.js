const businessDays = require("../lib/businessDays");

test("from 2020-04-20 to 2020-04-30 to equal 9", () => {
  expect(businessDays("2020-04-20", "2020-04-30")).toBe(9);
});

test("from 2019-09-30 to 2019-10-07 to equal 6", () => {
  expect(businessDays("2019-12-25", "2020-01-06")).toBe(9);
});
