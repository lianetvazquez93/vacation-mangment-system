const totalDays = require("../lib/totatDays");

test("from 2020-04-20 to 2020-04-30 to equal 11", () => {
  expect(totalDays("2020-04-20", "2020-04-30")).toBe(11);
});

test("from 2020-08-15 to 2020-08-31 to equal 17", () => {
  expect(totalDays("2020-08-15", "2020-08-31")).toBe(17);
});
