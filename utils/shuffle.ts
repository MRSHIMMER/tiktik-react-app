const getRandomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const shuffle = (array: any[]) => {
  let newArr = array.slice();
  for (let i = 0; i < newArr.length; i++) {
    const j = getRandomNum(0, i);
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};
