import _ from 'lodash';

export const currency = (str) => {
  const currSymbol = 'Rp. ';

  const strRev = _.reverse(str.split("")).join("");
};
