export const uid = () =>
  Math.random()
    .toString(36)
    .substr(2);
