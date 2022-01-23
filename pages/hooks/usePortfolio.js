import useSWR from "swr";
import useWalletAuth from "./useWalletAuth";

const OPENSEA_API_BASE_URL = "https://api.opensea.io/api/v1";

const fetcher = (url) => fetch(url).then((r) => r.json());

const useCollections = () => {
  const { id } = useWalletAuth();
  const { data, error } = useSWR(
    `${OPENSEA_API_BASE_URL}/collections?asset_owner=${id}`,
    fetcher
  );

  if (!data) {
    return { collections: [] };
  }

  return {
    collections: data.map((collection) => ({
      imageUrl: collection.imageUrl,
      name: collection.name,
      numberOwned: collection.owned_asset_count
    })),
  };
};

const usePortfolio = () => {
  const { collections } = useCollections();

  return {
    collections,
  };
};

export default usePortfolio;
