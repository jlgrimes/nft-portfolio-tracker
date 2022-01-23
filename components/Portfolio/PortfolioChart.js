import { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { getPortfolioGraphOptions } from "../../src/utils/portfolio";

const PortfolioChart = ({ collections }) => {
  useEffect(() => {
    console.log(getPortfolioGraphOptions(collections))
    var chart = new ApexCharts(
      document.querySelector("#portfolio-chart"),
      getPortfolioGraphOptions(collections)
    );

    chart.render();
  }, []);

  return <div id="portfolio-chart" />;
};

export default PortfolioChart;
