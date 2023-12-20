import { parseDate, lastMonth } from "../src/utils/dateFunction";

test("parseDate 동작확인", () => {
  console.log("변환 결과: ", parseDate(new Date()));
});
test("lastMonth 동작확인", () => {
  console.log("변환 결과: ", lastMonth(new Date()));
});
