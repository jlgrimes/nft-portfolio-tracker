import { API_URL } from "./constants";

const getPortfolioValueHeader = (stats) => {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const ethValue = stats.average_eth.toFixed(2);
  const usdValue = currencyFormatter.format(stats.average_usd);

  return `${ethValue} ETH (${usdValue} USD)`;
};

const Portfolio = ({ collections, stats }) => {
  return (
    <div>
      {getPortfolioValueHeader(stats)}
      {collections.map((collection) => (
        <div>
          <div>
            {collection.name}
          </div>
          <div>
            {collection.stats.seven_day_average_price}
          </div>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  // ID hardcoded for now
  const res = await fetch(`${API_URL}/portfolio?id=0x7686c7295e417dCF92c0ac6c52516c747969bfE3`);
  const { collections, stats} = await res.json()

  return { props: { collections, stats } }
}

export default Portfolio;
