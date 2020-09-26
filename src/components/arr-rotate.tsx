export const arrRotate = (vect: any[]) => (steps = 1) => (val: any) =>
  vect[(vect.indexOf(val) + steps) % vect.length];
