const randomID = (
  base: string[],
  { len = 4, sep = "" }: { len?: number; sep?: string },
  random = ({ len }: { len: number }) => Math.random() * 10 ** len,
) => [...base, random({ len })].join(sep);

export default randomID;
