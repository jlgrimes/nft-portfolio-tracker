import dynamic from 'next/dynamic'
import { getPortfolioValueHeader } from '../utils/portfolio';
import { API_URL } from "../constants"

const PortfolioChart = dynamic(() => import('../../components/Portfolio/PortfolioChart'), { ssr: false });

const Home = ({ collections, stats }) => {

  return (
    <div>
      {getPortfolioValueHeader(stats)}
      <PortfolioChart collections={collections} />
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

export default Home;
