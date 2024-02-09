const decodeTlv = (buffer, acc = {}) => {
  const t = buffer[0];
  const l = buffer[1];
  const v = buffer.slice(2, 2 + l);
  const values = acc[t] ?? [];
  const result = { ...acc, [t]: [...values, v] };
  const rest = buffer.slice(2 + l);
  return rest.length > 0 ? decodeTlv(rest, result) : result;
};

module.exports = {
  decodeTlv,
};
