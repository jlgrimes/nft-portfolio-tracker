import { subDays } from "date-fns";

/**
 * Gets average portfolio value given a key of stats.
 *
 * @param {Array} collections Collections object returned from collections API
 * @param {String} key Key in stats object to access
 * @returns
 */
export const getAveragePortfolioValue = (collections, key) => {
  return collections.reduce((acc, collection) => {
    return acc + collection.stats[key] * collection.stats.owned_asset_count;
  }, 0);
};

export const getPortfolioValueHeader = (stats) => {
  return 'hi'
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const ethValue = stats.average_eth.toFixed(2);
  const usdValue = currencyFormatter.format(stats.average_usd);

  return `${ethValue} ETH (${usdValue} USD)`;
};

export const getPortfolioLength = (collections) => {
  return collections.reduce((acc, collection) => {
    return acc + collection.owned_asset_count;
  }, 0);
};

export const getPortfolioDataPointsSingleCollection = (collection) => {
  // const currentDayAverage = collection.stats.one_day_average_price * collection.owned_asset_count;
  // const yesterdayAverage = (currentDayAverage - collection.stats.one_day_change) * collection.owned_asset_count;
  // const lastWeekAverage = (collection.stats.seven_day_average_price) * collection.owned_asset_count;
  // const previousWeekAverage =
  //   lastWeekAverage - (collection.stats.seven_day_change) * collection.owned_asset_count;
  // const last30DayAverage = (collection.stats.thirty_day_average_price) * collection.owned_asset_count;
  // const previous30DayAverage =
  //   (last30DayAverage - collection.stats.thirty_day_change) * collection.owned_asset_count;

  // // First five days of last week average is the week average minus the last two days, averaged
  // const firstFiveOfLastWeekAverage =
  //   ((lastWeekAverage * 7 - currentDayAverage - yesterdayAverage) / 5) * collection.owned_asset_count;
  // // Follow the same logic to get the initial 21 day average
  // const first23OfLast30Average =
  //   ((last30DayAverage * 7 - currentDayAverage - yesterdayAverage) / 23) * collection.owned_asset_count;

  return [
    // Opensea thirty day average price is somehow glitched
    // {
    //   x: subDays(new Date(), 45).getTime(),
    //   y: collection.weighted_stats.previous_thirty_day_average_price,
    // },
    // {
    //   x: subDays(new Date(), 18.5).getTime(),
    //   y: first23OfLast30Average,
    // },
    {
      x: subDays(new Date(), 15).getTime(),
      y: collection.weighted_stats.thirty_day_average_price,
    },
    {
      x: subDays(new Date(), 10.5).getTime(),
      y: collection.weighted_stats.previous_week_average_price,
    },
    // {
    //   x: subDays(new Date(), 4.5).getTime(),
    //   y: firstFiveOfLastWeekAverage,
    // },
    {
      x: subDays(new Date(), 3.5).getTime(),
      y: collection.weighted_stats.seven_day_average_price,
    },
    {
      x: subDays(new Date(), 1).getTime(),
      y: collection.weighted_stats.yesterday_average_price,
    },
    {
      x: new Date().getTime(),
      y: collection.weighted_stats.one_day_average_price,
    },
  ];
};

export const getPortfolioGraphOptions = (collections) => {
  const portfolioLength = getPortfolioLength(collections);

  const portfolioData = collections.reduce((acc, collection) => {
    const singleCollectionData =
      getPortfolioDataPointsSingleCollection(collection);
      console.log(singleCollectionData)

    if (acc.length === 0) {
      return singleCollectionData;
    }

    return acc.map(({ x, y }, idx) => ({
      x,
      y: y + singleCollectionData[idx].y
    }));
  }, []);

  return {
    chart: {
      id: 'portfolio-chart',
    },
    series: [
      {
        data: portfolioData,
      },
    ],
    xaxis: {
      type: "datetime",
    },
  };
};
