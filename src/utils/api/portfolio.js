export const getWeightedStats = (collection) => {
  const weightedExistingStats = Object.entries(collection.stats).reduce((acc, [key, val]) => {
    return {
      ...acc,
      [key]: val * collection.owned_asset_count
    }
  }, {});

  return {
    ...weightedExistingStats,
    yesterday_average_price: weightedExistingStats.one_day_average_price - weightedExistingStats.one_day_change,
    previous_week_average_price: weightedExistingStats.seven_day_average_price - weightedExistingStats.seven_day_change
  }
}