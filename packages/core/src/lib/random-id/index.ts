export interface IRandomIDOptions {
  len?: number;
  sep?: string;
}
export type IRandomIDRandomize = (arg1: IRandomIDOptions) => string;

const DefaultGetRandom: IRandomIDRandomize = ({ len = 1 }) =>
  (Math.random() * 10 ** len).toFixed(0).padStart(len, "0");

const randomID = (
  base: string[],
  { len = 4, sep = "" }: IRandomIDOptions = {},
  randomize: IRandomIDRandomize = DefaultGetRandom,
) => [...base, randomize({ len })].join(sep);

export default randomID;
