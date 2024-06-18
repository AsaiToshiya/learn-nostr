const { TextDecoder, TextEncoder } = require("util");
const { bech32 } = require("@scure/base");
const { decodeTlv, encodeTlv } = require("./tlv");

test("decode TLV", async () => {
  const bech32String = "nprofile1qqsrhuxx8l9ex335q7he0f09aej04zpazpl0ne2cgukyawd24mayt8gpp4mhxue69uhhytnc9e3k7mgpz4mhxue69uhkg6nzv9ejuumpv34kytnrdaksjlyr9p";
  const data = bech32.decode(bech32String, 1000).words;
  const buffer = new Uint8Array(bech32.fromWords(data));

  const tlv = decodeTlv(buffer);

  expect(Buffer.from(tlv[0][0]).toString("hex")).toEqual("3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d");
  expect(tlv[1].length).toEqual(2);
  expect(new TextDecoder().decode(tlv[1][0])).toEqual("wss://r.x.com");
  expect(new TextDecoder().decode(tlv[1][1])).toEqual("wss://djbas.sadkb.com");
});

test("encode TLV", async () => {
  const tlv = {
    0: [Uint8Array.from(Buffer.from("3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d", "hex"))],
    1: ["wss://r.x.com", "wss://djbas.sadkb.com"].map((v) => new TextEncoder().encode(v)),
  };

  const buffer = encodeTlv(tlv);

  const words = bech32.toWords(buffer);
  const bech32String = bech32.encode("nprofile", words, 1000);

  expect(bech32String).toEqual(
    "nprofile1qqsrhuxx8l9ex335q7he0f09aej04zpazpl0ne2cgukyawd24mayt8gpp4mhxue69uhhytnc9e3k7mgpz4mhxue69uhkg6nzv9ejuumpv34kytnrdaksjlyr9p"
  );
});
