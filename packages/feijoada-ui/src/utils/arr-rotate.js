const arrRotate = (vect) => (steps = 1) => (val) =>
  vect[(vect.indexOf(val) + steps) % vect.length];

export default arrRotate;
