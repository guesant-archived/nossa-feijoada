export const padleftArrIndex = (
  idx: number,
  { length }: { length: number },
  increment: number = 1,
) => String(idx).padStart(String(length).length + increment, "0");
