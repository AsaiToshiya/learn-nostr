const { decode, encode } = require("./nreq");

test("encode and decode nreq", () => {
  const nreq = encode({
    kinds: [30818],
    "#d": ["wiki"],
  });
  expect(nreq).toMatch(/nreq1\w+/);
  const filter = decode(nreq);
  expect(filter.kinds).toEqual([30818]);
  expect(filter).toHaveProperty("#d", ["wiki"]);
});
