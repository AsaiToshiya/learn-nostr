const decodeTlv = (buffer, acc = {}) => {
  const t = buffer[0];
  const l = buffer[1];
  const v = buffer.slice(2, 2 + l);
  const values = acc[t] ?? [];
  const result = { ...acc, [t]: [...values, v] };
  const rest = buffer.slice(2 + l);
  return rest.length > 0 ? decodeTlv(rest, result) : result;
};

const encodeTlv = (tlv) =>
  new Uint8Array(
    Object.entries(tlv)
      .map(([t, values]) =>
        values.map((v) => {
          const l = v.length;
          const buffer = new Uint8Array(2 + l);
          buffer.set([parseInt(t)], 0);
          buffer.set([l], 1);
          buffer.set(v, 2);
          return buffer;
        })
      )
      .flat()
      .reduce((acc, obj) => [...acc, ...obj], [])
  );

module.exports = {
  decodeTlv,
  encodeTlv,
};
