const createIntake = (height, age, cweight, dweight) => {
  return (
    10 * Number(cweight) +
    6.25 * Number(height) -
    5 * Number(age) -
    161 -
    10 * (Number(cweight) - Number(dweight))
  );
};

module.exports = createIntake;
