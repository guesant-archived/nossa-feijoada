const padleftArrIndex = (idx, { length }, extra = 1) =>
  String(idx).padStart(String(length).length + extra, "0");

export default padleftArrIndex;
