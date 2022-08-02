const getNextWeek = (count) => {
  const oneDay = 86400000;
  const today = new Date();

  let nextWeek = (6 - today.getDay()) * oneDay;

  nextWeek += oneDay - (today.getTime() % oneDay);

  if (count > 0) {
    nextWeek += oneDay * 7 - (count - 1);
  }

  return nextWeek;
};

export default getNextWeek;
