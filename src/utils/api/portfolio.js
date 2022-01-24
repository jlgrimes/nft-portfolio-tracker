export const getWeightedStats = (collection) => {
  const weightedExistingStats = Object.entries(collection.stats).reduce(
    (acc, [key, val]) => {
      return {
        ...acc,
        [key]: val * collection.owned_asset_count,
      };
    },
    {}
  );

  const yesterdayAveragePrice =
    weightedExistingStats.one_day_average_price -
    weightedExistingStats.one_day_change;
  const previousWeekAveragePrice =
    weightedExistingStats.seven_day_average_price -
    weightedExistingStats.seven_day_change;

  return {
    ...weightedExistingStats,
    yesterday_average_price: yesterdayAveragePrice,
    first_five_days_last_week_average_price:
      (weightedExistingStats.seven_day_average_price * 7 -
        weightedExistingStats.one_day_average_price -
        yesterdayAveragePrice) /
      5,
    previous_week_average_price: previousWeekAveragePrice,
  };
};
