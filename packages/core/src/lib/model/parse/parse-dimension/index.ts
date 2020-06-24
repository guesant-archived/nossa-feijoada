const makeString = (val: any) => String(val);
const parseInt_ = (val: any) => parseInt(makeString(val));

// "0" caso o usuário digite um número inválido
const parseVal = (val: any) => (isNaN(parseInt_(val)) ? 0 : parseInt_(val));

// pode ser que a entrada do usuário indique um número
// negativo, entretanto esse número não é considerado válido.
const parseDimension = (val: string) => Math.max(0, parseVal(val));
export default parseDimension;
