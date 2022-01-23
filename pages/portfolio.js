import { usePortfolio } from "./hooks";

const Portfolio = () => {
  const { collections } = usePortfolio();
  return (
    <div>
      {collections.map((collection) => (
        <div>
          {collection.name}
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
