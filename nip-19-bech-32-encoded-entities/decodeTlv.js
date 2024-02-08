const decodeTlv = (buffer, result = {}) => {
  const t = buffer[0];
  const l = buffer[1];
  const v = buffer.slice(2, 2 + l);
  const values = result[t] ?? [];
  const newResult = { ...result, [t]: [...values, v] };
  const rest = buffer.slice(2 + l);
  return rest.length > 0 ? decodeTlv(rest, newResult) : newResult;
};

module.exports = {
  decodeTlv,
};
