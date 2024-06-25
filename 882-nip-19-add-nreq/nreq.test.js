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

test("ignore undefined metadata", () => {
  expect(
    decode(
      encode({
        "#d": ["wiki"],
      })
    )
  ).toEqual({
    "#d": ["wiki"],
  });
  expect(
    decode(
      encode({
        kinds: [30818],
      })
    )
  ).toEqual({
    kinds: [30818],
  });
});
