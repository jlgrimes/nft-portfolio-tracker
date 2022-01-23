export const getAveragePortfolioValue = (collections) => {
  return collections.reduce((acc, collection) => {
    return acc + collection.stats.seven_day_average_price;
  }, 0);
}