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
    return acc + collection.stats[key] * collection.owned_asset_count;
  }, 0);
};

export const getPortfolioValueHeader = (stats) => {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const ethValue = stats.average_eth?.toFixed(2);
  const usdValue = currencyFormatter.format(stats.average_usd);

  return `${ethValue} ETH (${usdValue} USD)`;
};

export const getPortfolioLength = (collections) => {
  return collections.reduce((acc, collection) => {
    return acc + collection.owned_asset_count;
  }, 0);
};

export const getPortfolioDataPointsSingleCollection = (collection) => {
  return [
    // Opensea thirty day delta is somehow glitched
    // {
    //   x: subDays(new Date(), 45).getTime(),
    //   y: collection.weighted_stats.previous_thirty_day_average_price,
    // },
    // {
    //   x: subDays(new Date(), 18.5).getTime(),
    //   y: collection.weighted_stats.first_16_last_30_average_price,
    // },
    {
      x: subDays(new Date(), 15).getTime(),
      y: collection.weighted_stats.thirty_day_average_price,
    },
    {
      x: subDays(new Date(), 10.5).getTime(),
      y: collection.weighted_stats.previous_week_average_price,
    },
    {
      x: subDays(new Date(), 4.5).getTime(),
      y: collection.weighted_stats.first_five_days_last_week_average_price,
    },
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
  const portfolioData = collections.reduce((acc, collection) => {
    const singleCollectionData =
      getPortfolioDataPointsSingleCollection(collection);

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
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: "datetime",
    },
  };
};
