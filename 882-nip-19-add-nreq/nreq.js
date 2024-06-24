const { TextDecoder, TextEncoder } = require("util");
const { bech32 } = require("@scure/base");
const { decodeTlv, encodeTlv } = require("./tlv");

const decode = (nreq) => {
  const words = bech32.decode(nreq, 1000).words;
  const buffer = new Uint8Array(bech32.fromWords(words));
  const tlv = decodeTlv(buffer);
  return {
    kinds: tlv[3].map((v) =>
      parseInt(Buffer.from(v.reverse()).toString("hex"), 16)
    ),
    ...tlv[5].reduce((acc, obj) => {
      const value = new TextDecoder().decode(obj);
      const tag = `#${value[0]}`;
      const tagValue = value.slice(1);
      const curValues = acc[tag] ?? [];
      return { ...acc, [tag]: [...curValues, tagValue] };
    }, {}),
  };
};

const encode = (filter) => {
  const tlv = {
    3: filter.kinds.map(
      (kind) =>
        // リトル エンディアン
        new Uint8Array([
          kind & 0xff,
          (kind >> 8) & 0xff,
          (kind >> 16) & 0xff,
          (kind >> 24) & 0xff,
        ])
    ),
    5: Object.keys(filter)
      .filter((key) => key.startsWith("#"))
      .map((key) =>
        filter[key].map((value) => new TextEncoder().encode(key[1] + value))
      )
      .flat(),
  };
  const buffer = encodeTlv(tlv);
  const words = bech32.toWords(buffer);
  return bech32.encode("nreq", words, 1000);
};

module.exports = {
  decode,
  encode,
};
